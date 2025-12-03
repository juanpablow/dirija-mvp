import prisma from '../config/database';
import { CreateInstructorDTO, InstructorResponse } from '../types';
import { Prisma } from '@prisma/client';

class InstructorService {
  /**
   * Cria um lead de instrutor (captura inicial de dados)
   * Não cria uma conta completa, apenas armazena os dados de contato
   */
  async createInstructorLead(data: CreateInstructorDTO): Promise<InstructorResponse> {
    try {
      // Verifica se já existe um usuário com este email
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new Error('Este email já está cadastrado');
      }

      // Cria o usuário com role DRIVER (sem senha por enquanto, será definida posteriormente)
      // Usamos um hash temporário que será substituído quando o instrutor completar o cadastro
      const tempPassword = Math.random().toString(36).substring(2, 15);
      
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: 'DRIVER',
          password: tempPassword, // Senha temporária, será redefinida pelo instrutor
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002 é o código para unique constraint violation
        if (error.code === 'P2002') {
          throw new Error('Este email já está cadastrado');
        }
      }
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Erro ao criar cadastro de instrutor');
    }
  }

  /**
   * Lista todos os leads de instrutores
   */
  async getAllInstructorLeads(): Promise<InstructorResponse[]> {
    try {
      const instructors = await prisma.user.findMany({
        where: {
          role: 'DRIVER',
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return instructors;
    } catch (error) {
      throw new Error('Erro ao buscar instrutores');
    }
  }

  /**
   * Busca um lead de instrutor por ID
   */
  async getInstructorLeadById(id: string): Promise<InstructorResponse | null> {
    try {
      const instructor = await prisma.user.findFirst({
        where: {
          id,
          role: 'DRIVER',
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true,
        },
      });

      return instructor;
    } catch (error) {
      throw new Error('Erro ao buscar instrutor');
    }
  }
}

export default new InstructorService();
