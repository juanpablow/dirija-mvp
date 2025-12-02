const driverService = require('../services/driver.service');

class DriverController {
  async getAllDrivers(req, res, next) {
    try {
      const filters = req.query;
      const drivers = await driverService.getAllDrivers(filters);
      res.json(drivers);
    } catch (error) {
      next(error);
    }
  }

  async getDriverById(req, res, next) {
    try {
      const { id } = req.params;
      const driver = await driverService.getDriverById(id);
      res.json(driver);
    } catch (error) {
      next(error);
    }
  }

  async updateDriver(req, res, next) {
    try {
      const { id } = req.params;
      const driver = await driverService.updateDriver(id, req.userId, req.body);
      res.json(driver);
    } catch (error) {
      next(error);
    }
  }

  async setAvailability(req, res, next) {
    try {
      const { id } = req.params;
      const { availabilities } = req.body;
      const result = await driverService.setAvailability(id, req.userId, availabilities);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getDriverStats(req, res, next) {
    try {
      const { id } = req.params;
      const stats = await driverService.getDriverStats(id, req.userId);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DriverController();
