const mongoose = require('mongoose');

const addProjectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: [true, 'Project ID is required'],
      unique: true,
      trim: true,
    },
    projectTitle: {
      type: String,
      required: [true, 'Project Title is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: ['Development', 'Sales', 'Marketing', 'Social Media'],
    },
    projectPriority: {
      type: String,
      required: [true, 'Project Priority is required'],
      enum: ['High', 'Medium', 'Low'],
    },
    client: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    team: {
      type: [String],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'At least one team member must be assigned.',
      },
    },
    workStatus: {
      type: String,
      enum: ['Active', 'Completed', 'Running', 'Pending', 'Not Started', 'Canceled'],
      default: 'Running',
    },
    projectDescription: {
      type: String,
      required: [true, 'Project short description is required'],
      trim: true,
    },
    budget: {
      type: Number,
      required: [true, 'Budget amount is required'],
    },
    projectManager: {
      type: String,
      required: [true, 'Project Manager name is required'],
      trim: true,
    },
    projectType: {
      type: String,
      required: [true, 'Project Type is required'],
      // Updated to match all options from the React frontend
      enum: [
        'Web Development',
        'Mobile App Development',
        'UI/UX Design',
        'Frontend Development',
        'E-Commerce Development',
        'Custom Web Application',
        'ERP / CRM Development',
        'API Development & Integration',
        'Database Development',
        'Digital Marketing & SEO',
        'Graphic Design & Branding',
        'Domain & Hosting Setup',
        'Technical Support',
      ],
    },
    richDescription: {
      type: String,
      default: '',
    },
    projectImage: {
      filename: { type: String, default: '' },
      path: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AddProject', addProjectSchema);