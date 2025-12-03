import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import instructorService from '../services/instructor.service';
import { CreateInstructorDTO, ApiResponse, InstructorResponse } from '../types';

class InstructorController {
  /**
   * POST /api/instructors
   * Cria um lead de instrutor (captura inicial de dados)
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Validação dos dados de entrada
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: errors.array(),
        } as ApiResponse);
        return;
      }

      const data: CreateInstructorDTO = req.body;

      const instructor = await instructorService.createInstructorLead(data);

      res.status(201).json({
        success: true,
        message: 'Cadastro recebido com sucesso! Entraremos em contato em breve.',
        data: instructor,
      } as ApiResponse<InstructorResponse>);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          error: error.message,
        } as ApiResponse);
        return;
      }
      next(error);
    }
  }

  /**
   * GET /api/instructors
   * Lista todos os leads de instrutores
   */
  async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const instructors = await instructorService.getAllInstructorLeads();

      res.status(200).json({
        success: true,
        data: instructors,
        total: instructors.length,
      } as ApiResponse<InstructorResponse[]>);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/instructors/:id
   * Busca um lead de instrutor por ID
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const instructor = await instructorService.getInstructorLeadById(id);

      if (!instructor) {
        res.status(404).json({
          success: false,
          error: 'Instrutor não encontrado',
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: instructor,
      } as ApiResponse<InstructorResponse>);
    } catch (error) {
      next(error);
    }
  }
}

export default new InstructorController();
