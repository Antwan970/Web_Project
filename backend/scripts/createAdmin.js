// Script to create the first admin user
// Run: node scripts/createAdmin.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Models
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  profile: Object,
  lastLogin: Date,
  loginCount: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

const adminSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
  permissions: Object,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  lastAdminLogin: Date,
  adminLoginCount: Number,
  createdAt: Date,
  updatedAt: Date,
});

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);

async function createAdmin() {
  try {
    console.log('\n=== Creating Admin User ===\n');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal');
    console.log('✓ Connected to MongoDB\n');

    // List all users
    const users = await User.find().select('-password');
    
    if (users.length === 0) {
      console.log('❌ No users found. Please register a user first.\n');
      await mongoose.connection.close();
      return;
    }

    console.log('Available users:\n');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
    });

    // For demo: Create admin from first user
    const user = users[0];
    
    // Check if already admin
    const existingAdmin = await Admin.findOne({ userId: user._id });
    if (existingAdmin) {
      console.log(`\n✓ ${user.name} is already an admin`);
      await mongoose.connection.close();
      return;
    }

    // Create admin
    const admin = new Admin({
      userId: user._id,
      name: user.name,
      email: user.email,
      role: 'superadmin',
      permissions: {
        viewUsers: true,
        editUsers: true,
        deleteUsers: true,
        viewJobs: true,
        editJobs: true,
        viewStats: true,
      },
      status: 'active',
    });

    await admin.save();

    console.log(`\n✓ Admin created successfully!\n`);
    console.log(`Admin Details:`);
    console.log(`- Name: ${admin.name}`);
    console.log(`- Email: ${admin.email}`);
    console.log(`- Role: ${admin.role}`);
    console.log(`- Status: ${admin.status}`);
    console.log(`\nYou can now login with this account to access the admin panel.\n`);

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createAdmin();
