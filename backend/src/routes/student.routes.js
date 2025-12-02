const express = require('express');

const router = express.Router();

// Placeholder for student-specific routes
router.get('/', (req, res) => {
  res.json({ message: 'Student routes' });
});

module.exports = router;
