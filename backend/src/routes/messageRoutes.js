const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/', messageController.createMessage);

// Protected routes (Admin only)
// ⭐ QUAN TRỌNG: Route cụ thể (/stats) phải đặt TRƯỚC route động (/:id)
router.get('/stats', protect, messageController.getMessageStats);  // ← Đặt trước

router.get('/', protect, messageController.getAllMessages);
router.get('/:id', protect, messageController.getMessageById);
router.put('/:id/status', protect, messageController.updateMessageStatus);
router.post('/:id/reply', protect, messageController.replyToMessage);
router.delete('/:id', protect, messageController.deleteMessage);

module.exports = router;