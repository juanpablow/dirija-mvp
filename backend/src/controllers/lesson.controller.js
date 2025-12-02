const lessonService = require('../services/lesson.service');

class LessonController {
  async createLesson(req, res, next) {
    try {
      // Get student ID from authenticated user
      const prisma = require('../config/database');
      const student = await prisma.student.findUnique({
        where: { userId: req.userId },
      });

      if (!student) {
        return res.status(403).json({ error: 'Only students can create lessons' });
      }

      const lesson = await lessonService.createLesson(student.id, req.body);
      res.status(201).json(lesson);
    } catch (error) {
      next(error);
    }
  }

  async getLessonById(req, res, next) {
    try {
      const { id } = req.params;
      const lesson = await lessonService.getLessonById(id);
      res.json(lesson);
    } catch (error) {
      next(error);
    }
  }

  async updateLessonStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const lesson = await lessonService.updateLessonStatus(id, req.userId, status);
      res.json(lesson);
    } catch (error) {
      next(error);
    }
  }

  async rateLesson(req, res, next) {
    try {
      const { id } = req.params;
      const { rating, review } = req.body;
      const lesson = await lessonService.rateLesson(id, req.userId, rating, review);
      res.json(lesson);
    } catch (error) {
      next(error);
    }
  }

  async getMyLessons(req, res, next) {
    try {
      const lessons = await lessonService.getMyLessons(req.userId, req.userRole);
      res.json(lessons);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LessonController();
