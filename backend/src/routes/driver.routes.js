const express = require('express');
const driverController = require('../controllers/driver.controller');
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', driverController.getAllDrivers);
router.get('/:id', driverController.getDriverById);

// Protected routes (drivers only)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('DRIVER'),
  driverController.updateDriver
);

router.post(
  '/:id/availability',
  authMiddleware,
  roleMiddleware('DRIVER'),
  driverController.setAvailability
);

router.get(
  '/:id/stats',
  authMiddleware,
  roleMiddleware('DRIVER'),
  driverController.getDriverStats
);

module.exports = router;
