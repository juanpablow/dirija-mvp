const prisma = require('../config/database');

class LessonService {
  async createLesson(studentId, lessonData) {
    const { driverId, scheduledDate, duration, location, price, notes } = lessonData;

    // Verify driver exists and is active
    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver || !driver.isActive || !driver.isApproved) {
      throw new Error('Driver not available');
    }

    // Create lesson
    const lesson = await prisma.lesson.create({
      data: {
        driverId,
        studentId,
        scheduledDate: new Date(scheduledDate),
        duration,
        location,
        price,
        notes,
        status: 'PENDING',
      },
      include: {
        driver: {
          include: {
            user: {
              select: {
                name: true,
                phone: true,
              },
            },
          },
        },
        student: {
          include: {
            user: {
              select: {
                name: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    return lesson;
  }

  async getLessonById(lessonId) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        driver: {
          include: {
            user: {
              select: {
                name: true,
                phone: true,
                email: true,
              },
            },
          },
        },
        student: {
          include: {
            user: {
              select: {
                name: true,
                phone: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    return lesson;
  }

  async updateLessonStatus(lessonId, userId, status) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        driver: true,
        student: true,
      },
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    // Verify user is either the driver or student
    if (lesson.driver.userId !== userId && lesson.student.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const updatedLesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: { status },
      include: {
        driver: {
          include: {
            user: {
              select: {
                name: true,
                phone: true,
              },
            },
          },
        },
        student: {
          include: {
            user: {
              select: {
                name: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    // Update driver stats if lesson completed
    if (status === 'COMPLETED') {
      await prisma.driver.update({
        where: { id: lesson.driverId },
        data: {
          totalLessons: {
            increment: 1,
          },
        },
      });
    }

    return updatedLesson;
  }

  async rateLesson(lessonId, userId, rating, review) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        student: true,
        driver: true,
      },
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    // Only student can rate
    if (lesson.student.userId !== userId) {
      throw new Error('Unauthorized');
    }

    if (lesson.status !== 'COMPLETED') {
      throw new Error('Can only rate completed lessons');
    }

    // Update lesson
    const updatedLesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: { rating, review },
    });

    // Update driver average rating
    const driverLessons = await prisma.lesson.findMany({
      where: {
        driverId: lesson.driverId,
        rating: { not: null },
      },
      select: {
        rating: true,
      },
    });

    const averageRating =
      driverLessons.reduce((sum, l) => sum + l.rating, 0) / driverLessons.length;

    await prisma.driver.update({
      where: { id: lesson.driverId },
      data: { rating: averageRating },
    });

    return updatedLesson;
  }

  async getMyLessons(userId, role) {
    let lessons;

    if (role === 'DRIVER') {
      const driver = await prisma.driver.findUnique({
        where: { userId },
      });

      lessons = await prisma.lesson.findMany({
        where: { driverId: driver.id },
        include: {
          student: {
            include: {
              user: {
                select: {
                  name: true,
                  phone: true,
                },
              },
            },
          },
        },
        orderBy: {
          scheduledDate: 'desc',
        },
      });
    } else if (role === 'STUDENT') {
      const student = await prisma.student.findUnique({
        where: { userId },
      });

      lessons = await prisma.lesson.findMany({
        where: { studentId: student.id },
        include: {
          driver: {
            include: {
              user: {
                select: {
                  name: true,
                  phone: true,
                },
              },
            },
          },
        },
        orderBy: {
          scheduledDate: 'desc',
        },
      });
    }

    return lessons;
  }
}

module.exports = new LessonService();
