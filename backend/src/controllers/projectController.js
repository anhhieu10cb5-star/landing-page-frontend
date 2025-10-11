// backend/src/controllers/projectController.js
const Project = require('../models/Project');

// Create new project
exports.createProject = async (req, res) => {
  try {
    const {
      projectCode,
      projectName,
      description,
      clientName,
      clientEmail,
      clientPhone,
      type,
      status,
      progress,
      budget,
      startDate,
      endDate,
      technologies,
      milestones,
      notes
    } = req.body;

    // Validate required fields
    if (!projectCode || !projectName || !clientName || !clientEmail || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: projectCode, projectName, clientName, clientEmail, startDate, endDate'
      });
    }

    // Check if project code already exists
    const existingProject = await Project.findOne({ projectCode: projectCode.toUpperCase() });
    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: 'Project code already exists'
      });
    }

    // Map type to projectType enum
    const typeMap = {
      'Website': 'website',
      'Mobile App': 'mobile-app',
      'Web App': 'web-app',
      'E-Commerce': 'ecommerce',
      'Landing Page': 'landing-page',
      'Backend API': 'backend'
    };

    const project = new Project({
      projectCode: projectCode.toUpperCase(),
      title: projectName, // Map projectName to title
      description: description || 'No description provided', // Default if empty
      clientName,
      clientEmail,
      projectType: typeMap[type] || 'website', // Map type to projectType
      status: status.toLowerCase().replace(' ', '-'), // 'In Progress' → 'in-progress'
      progress: progress || 0,
      budget: budget || 0,
      startDate,
      estimatedEndDate: endDate, // Map endDate to estimatedEndDate
      technologies: technologies || [],
      milestones: (milestones || []).map(m => ({
        title: m.name || 'Untitled Milestone',
        description: m.description || '',
        status: (m.status || 'pending').toLowerCase().replace(' ', '-')
      })),
      notes,
      dailyUpdates: []
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

// Get project by code (for clients)
exports.getProjectByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const project = await Project.findOne({ projectCode: code.toUpperCase() });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};

// Get project by ID (for admin)
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error getting project by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all projects (Admin only)
exports.getAllProjects = async (req, res) => {
  try {
    const { status, projectType, page = 1, limit = 100 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (projectType) query.projectType = projectType;

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Project.countDocuments(query);

    res.status(200).json({
      success: true,
      data: projects,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      projectName,
      description,
      clientName,
      clientEmail,
      clientPhone,
      type,
      status,
      progress,
      budget,
      startDate,
      endDate,
      technologies,
      milestones,
      notes
    } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Map type to projectType enum
    const typeMap = {
      'Website': 'website',
      'Mobile App': 'mobile-app',
      'Web App': 'web-app',
      'E-Commerce': 'ecommerce',
      'Landing Page': 'landing-page',
      'Backend API': 'backend'
    };

    // Update fields
    if (projectName) project.title = projectName;
    if (description !== undefined) project.description = description;
    if (clientName) project.clientName = clientName;
    if (clientEmail) project.clientEmail = clientEmail;
    if (type) project.projectType = typeMap[type] || 'website';
    if (status) project.status = status.toLowerCase().replace(' ', '-');
    if (progress !== undefined) project.progress = progress;
    if (budget !== undefined) project.budget = budget;
    if (startDate) project.startDate = startDate;
    if (endDate) project.estimatedEndDate = endDate;
    if (technologies) project.technologies = technologies;
    if (milestones) {
      project.milestones = milestones.map(m => ({
        title: m.name,
        description: m.description,
        status: m.status.toLowerCase().replace(' ', '-')
      }));
    }
    if (notes !== undefined) project.notes = notes;

    await project.save();

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

// Add daily update
exports.addDailyUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { update, progress } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await project.addDailyUpdate(update, progress);

    res.status(200).json({
      success: true,
      message: 'Daily update added successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding daily update',
      error: error.message
    });
  }
};

// Update milestone status
exports.updateMilestone = async (req, res) => {
  try {
    const { id, milestoneId } = req.params;
    const { status } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const milestone = project.milestones.id(milestoneId);
    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: 'Milestone not found'
      });
    }

    milestone.status = status;
    if (status === 'completed') {
      milestone.completedAt = new Date();
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: 'Milestone updated successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating milestone',
      error: error.message
    });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};