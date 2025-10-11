// backend/createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Schema Admin
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'super-admin'], default: 'admin' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

// Tạo admin
async function createAdmin() {
  try {
    const existingAdmin = await Admin.findOne({ email: 'admin@devstudio.com' });
    
    if (existingAdmin) {
      console.log('⚠️ Admin already exists!');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123456', 10);

    const admin = new Admin({
      email: 'admin@devstudio.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'super-admin',
      isActive: true
    });

    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('📧 Email: admin@devstudio.com');
    console.log('🔑 Password: admin123456');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdmin();