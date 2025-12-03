import { body } from 'express-validator';

export const createInstructorValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 3, max: 100 })
    .withMessage('Nome deve ter entre 3 e 100 caracteres'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email é obrigatório')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Telefone é obrigatório')
    .matches(/^(\+?55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/)
    .withMessage('Telefone inválido. Use formato: (11) 98765-4321'),
];
