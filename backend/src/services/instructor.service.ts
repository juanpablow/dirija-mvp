import prisma from "../config/database";
import { CreateInstructorDTO, InstructorResponse } from "../types";
import { Prisma } from "@prisma/client";
import { sendInstructorWelcomeEmail } from "./email.service";

class InstructorService {
  /**
   * Cria um lead de instrutor (captura inicial de dados)
   * Não cria usuário ainda, apenas captura os dados de interesse
   */
  async createInstructorLead(
    data: CreateInstructorDTO
  ): Promise<InstructorResponse> {
    try {
      // Verifica se já existe um instrutor com este email
      const existingInstructor = await prisma.instructor.findUnique({
        where: { email: data.email },
      });

      if (existingInstructor) {
        throw new Error("Este email já está cadastrado");
      }

      // Cria o instrutor como LEAD (sem usuário associado ainda)
      const instructor = await prisma.instructor.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          status: "LEAD", // Status inicial: apenas um lead
          isActive: false, // Inativo até completar o cadastro
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          status: true,
          createdAt: true,
        },
      });

      // Envia email de boas-vindas (aguarda conclusão mas não quebra o fluxo se falhar)
      try {
        await sendInstructorWelcomeEmail({
          name: instructor.name,
          email: instructor.email,
        });
      } catch (error) {
        console.error("Erro ao enviar email de boas-vindas:", error);
        // Não lança erro para não quebrar o fluxo de cadastro
      }

      return instructor;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002 é o código para unique constraint violation
        if (error.code === "P2002") {
          throw new Error("Este email já está cadastrado");
        }
      }

      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Erro ao criar cadastro de instrutor");
    }
  }

  /**
   * Lista todos os instrutores (incluindo leads)
   */
  async getAllInstructorLeads(): Promise<InstructorResponse[]> {
    try {
      const instructors = await prisma.instructor.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return instructors;
    } catch (error) {
      throw new Error("Erro ao buscar instrutores");
    }
  }

  /**
   * Busca um instrutor por ID
   */
  async getInstructorLeadById(id: string): Promise<InstructorResponse | null> {
    try {
      const instructor = await prisma.instructor.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          status: true,
          createdAt: true,
        },
      });

      return instructor;
    } catch (error) {
      throw new Error("Erro ao buscar instrutor");
    }
  }
}

export default new InstructorService();
