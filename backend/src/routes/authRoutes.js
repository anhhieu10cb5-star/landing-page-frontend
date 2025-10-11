const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, superAdminOnly } = require('../middleware/auth');

// Public routes
router.post('/login', authController.login);

// Protected routes
router.get('/profile', protect, authController.getProfile);
router.put('/profile', protect, authController.updateProfile);
router.put('/change-password', protect, authController.changePassword);

// Super admin only
router.post('/register', protect, superAdminOnly, authController.register);

module.exports = router;