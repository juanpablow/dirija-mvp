const express = require('express');
const { body } = require('express-validator');
const lessonController = require('../controllers/lesson.controller');
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// Get my lessons (driver or student)
router.get('/my-lessons', authMiddleware, lessonController.getMyLessons);

// Get specific lesson
router.get('/:id', authMiddleware, lessonController.getLessonById);

// Create lesson (students only)
router.post(
  '/',
  authMiddleware,
  roleMiddleware('STUDENT'),
  [
    body('driverId').notEmpty(),
    body('scheduledDate').isISO8601(),
    body('duration').isInt({ min: 1 }),
    body('location').notEmpty(),
    body('price').isFloat({ min: 0 }),
  ],
  lessonController.createLesson
);

// Update lesson status
router.patch(
  '/:id/status',
  authMiddleware,
  [body('status').isIn(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'])],
  lessonController.updateLessonStatus
);

// Rate lesson (students only)
router.post(
  '/:id/rate',
  authMiddleware,
  roleMiddleware('STUDENT'),
  [
    body('rating').isInt({ min: 1, max: 5 }),
    body('review').optional().isString(),
  ],
  lessonController.rateLesson
);

module.exports = router;
