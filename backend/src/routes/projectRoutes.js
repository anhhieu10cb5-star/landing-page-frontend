const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/track/:code', projectController.getProjectByCode);

// Protected routes (Admin only)
router.get('/:id', protect, projectController.getProjectById); // ← THÊM DÒNG NÀY
router.post('/', protect, projectController.createProject);
router.get('/', protect, projectController.getAllProjects);
router.put('/:id', protect, projectController.updateProject);
router.delete('/:id', protect, projectController.deleteProject);
router.post('/:id/daily-update', protect, projectController.addDailyUpdate);
router.put('/:id/milestone/:milestoneId', protect, projectController.updateMilestone);

module.exports = router;