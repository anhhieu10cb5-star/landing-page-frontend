const Message = require('../models/Message');
const { sendReplyEmail } = require('../utils/emailService');

// Create new message (Contact form submission)
exports.createMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Get IP and User Agent
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');

    const newMessage = new Message({
      name,
      email,
      phone,
      message,
      ipAddress,
      userAgent
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      data: {
        id: newMessage._id,
        createdAt: newMessage.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
};

// Get all messages (Admin only)
exports.getAllMessages = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Message.countDocuments(query);

    res.status(200).json({
      success: true,
      data: messages,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: error.message
    });
  }
};

// Get single message by ID
exports.getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Mark as read
    if (message.status === 'new') {
      message.status = 'read';
      await message.save();
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching message',
      error: error.message
    });
  }
};

// Update message status
exports.updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const message = await Message.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message status updated successfully',
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating message status',
      error: error.message
    });
  }
};

// Reply to message
exports.replyToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyText } = req.body;

    // DEBUG: Log received data
    console.log('🔵 Reply request received:');
    console.log('  Message ID:', id);
    console.log('  Request body:', req.body);
    console.log('  Reply text:', replyText);
    console.log('  Reply text type:', typeof replyText);
    console.log('  Reply text length:', replyText?.length);

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    message.replied = true;
    message.replyText = replyText;
    message.repliedAt = new Date();
    message.status = 'replied';

    await message.save();

    console.log('✅ Message saved with reply:', message.replyText);

    // Send email to client with reply
    try {
      console.log('📤 Attempting to send email...');
      await sendReplyEmail({
        to: message.email,
        clientName: message.name,
        originalMessage: message.message,
        replyText: replyText
      });
      console.log('✅ Reply email sent successfully to:', message.email);
    } catch (emailError) {
      console.error('❌ Error sending email:', emailError.message);
      // Continue even if email fails - reply is still saved
    }

    res.status(200).json({
      success: true,
      message: 'Reply sent successfully',
      data: message
    });
  } catch (error) {
    console.error('❌ Error in replyToMessage:', error);
    res.status(500).json({
      success: false,
      message: 'Error replying to message',
      error: error.message
    });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting message',
      error: error.message
    });
  }
};

// Get message statistics
exports.getMessageStats = async (req, res) => {
  try {
    const total = await Message.countDocuments();
    const newMessages = await Message.countDocuments({ status: 'new' });
    const readMessages = await Message.countDocuments({ status: 'read' });
    const repliedMessages = await Message.countDocuments({ status: 'replied' });
    const archivedMessages = await Message.countDocuments({ status: 'archived' });

    res.status(200).json({
      success: true,
      data: {
        total,
        new: newMessages,
        read: readMessages,
        replied: repliedMessages,
        archived: archivedMessages
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching message statistics',
      error: error.message
    });
  }
};