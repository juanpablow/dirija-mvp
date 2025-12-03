import { Router } from 'express';
import instructorController from '../controllers/instructor.controller';
import { createInstructorValidator } from '../validators/instructor.validator';

const router = Router();

/**
 * @route   POST /api/instructors
 * @desc    Cria um lead de instrutor (captura inicial)
 * @access  Public
 */
router.post('/', createInstructorValidator, instructorController.create);

/**
 * @route   GET /api/instructors
 * @desc    Lista todos os leads de instrutores
 * @access  Private (Admin) - Por enquanto público para testes
 */
router.get('/', instructorController.list);

/**
 * @route   GET /api/instructors/:id
 * @desc    Busca um lead de instrutor por ID
 * @access  Private (Admin) - Por enquanto público para testes
 */
router.get('/:id', instructorController.getById);

export default router;
