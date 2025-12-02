const prisma = require('../config/database');

class DriverService {
  async getAllDrivers(filters = {}) {
    const { city, state, minRating, isActive = true } = filters;

    const where = {
      isActive,
      isApproved: true,
    };

    if (city) where.city = city;
    if (state) where.state = state;
    if (minRating) where.rating = { gte: parseFloat(minRating) };

    const drivers = await prisma.driver.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
        availabilities: true,
      },
      orderBy: {
        rating: 'desc',
      },
    });

    return drivers;
  }

  async getDriverById(driverId) {
    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
      include: {
        user: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
        availabilities: true,
        lessons: {
          include: {
            student: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: {
            scheduledDate: 'desc',
          },
        },
      },
    });

    if (!driver) {
      throw new Error('Driver not found');
    }

    return driver;
  }

  async updateDriver(driverId, userId, data) {
    // Verify ownership
    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver || driver.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const updatedDriver = await prisma.driver.update({
      where: { id: driverId },
      data,
      include: {
        user: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
        availabilities: true,
      },
    });

    return updatedDriver;
  }

  async setAvailability(driverId, userId, availabilities) {
    // Verify ownership
    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver || driver.userId !== userId) {
      throw new Error('Unauthorized');
    }

    // Delete existing availabilities
    await prisma.availability.deleteMany({
      where: { driverId },
    });

    // Create new availabilities
    const createdAvailabilities = await prisma.availability.createMany({
      data: availabilities.map(av => ({
        driverId,
        dayOfWeek: av.dayOfWeek,
        startTime: av.startTime,
        endTime: av.endTime,
      })),
    });

    return createdAvailabilities;
  }

  async getDriverStats(driverId, userId) {
    // Verify ownership
    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver || driver.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const totalLessons = await prisma.lesson.count({
      where: { driverId, status: 'COMPLETED' },
    });

    const totalEarnings = await prisma.lesson.aggregate({
      where: { driverId, status: 'COMPLETED' },
      _sum: {
        price: true,
      },
    });

    const pendingLessons = await prisma.lesson.count({
      where: { driverId, status: 'PENDING' },
    });

    const upcomingLessons = await prisma.lesson.findMany({
      where: {
        driverId,
        status: 'CONFIRMED',
        scheduledDate: {
          gte: new Date(),
        },
      },
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
        scheduledDate: 'asc',
      },
      take: 5,
    });

    return {
      totalLessons,
      totalEarnings: totalEarnings._sum.price || 0,
      pendingLessons,
      upcomingLessons,
      rating: driver.rating,
    };
  }
}

module.exports = new DriverService();
