const mongoose = require('mongoose');

const EmiInstallmentSchema = new mongoose.Schema({
  installmentNo: {
    type: Number,
    required: true
  },
  monthLabel: {
    type: String,
    required: true,
    trim: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Pending', 'Paid', 'Overdue', 'Cancelled'],
    default: 'Upcoming'
  },
  paidDate: {
    type: Date,
    default: null
  }
}, { _id: false });

const InvoiceSchema = new mongoose.Schema(
  {
    slNo: {
      type: Number
    },
    itemNo: {
      type: String,
      required: [true, 'Invoice number is required'],
      unique: true,
      trim: true
    },
    invoiceDate: {
      type: Date,
      required: [true, 'Invoice date is required'],
      default: Date.now
    },
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true
    },
    mobile: {
      type: String,
      required: [true, 'Primary mobile number is required'],
      trim: true
    },
    whatsapp: {
      type: String,
      trim: true,
      default: ''
    },
    email: {
      type: String,
      required: [true, 'Official email is required'],
      trim: true,
      lowercase: true
    },
    businessAddress: {
      type: String,
      trim: true,
      default: ''
    },
    projectName: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    projectCategory: {
      type: String,
      required: [true, 'Project category is required'],
      enum: [
        'WEBSITE DEVELOPMENT',
        'APPLICATION DEVELOPMENT',
        'BOTH WEBSITE AND APPLICATION',
        'SEO WORK',
        'SOCIAL MEDIA MANAGEMENT',
        'DIGITAL MARKETING'
      ],
      default: 'WEBSITE DEVELOPMENT'
    },
    projectDomain: {
      type: String,
      trim: true,
      default: ''
    },
    domainProvider: {
      type: String,
      enum: ['None / Not Applicable', 'Company', 'Client'],
      default: 'None / Not Applicable'
    },
    deliverablesSummary: {
      type: String,
      required: [true, 'Deliverables summary is required'],
      trim: true
    },
    projectDescription: {
      type: String,
      trim: true,
      default: ''
    },

    // Financial breakdown
    totalCost: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    advanceCost: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    advanceStatus: {
      type: String,
      enum: ['Paid', 'Partially Paid', 'Pending'],
      default: 'Paid'
    },
    advancePaidDate: {
      type: Date,
      default: null
    },
    remainingBalance: {
      type: Number,
      min: 0,
      default: 0
    },

    // EMI configuration
    emiMonths: {
      type: Number,
      min: 1,
      default: 1
    },
    emiStartMonth: {
      type: String, // e.g. "2026-09"
      trim: true,
      default: () => new Date().toISOString().slice(0, 7)
    },
    emiDayOfMonth: {
      type: Number,
      min: 1,
      max: 31,
      default: 1
    },
    perMonthEmi: {
      type: Number,
      min: 0,
      default: 0
    },

    // Tax & Totals
    tax: {
      type: Number,
      min: 0,
      default: 18
    },
    taxAmount: {
      type: Number,
      min: 0,
      default: 0
    },
    grandTotal: {
      type: Number,
      min: 0,
      default: 0
    },

    // Status & Tracking
    dueDate: {
      type: Date,
      default: null
    },
    status: {
      type: String,
      enum: ['In Progress', 'Completed', 'Pending', 'Cancelled'],
      default: 'In Progress'
    },

    // Schedule breakdown
    emiSchedule: [EmiInstallmentSchema]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Pre-save hook: Enforce calculation accuracy & sync next priority due date
InvoiceSchema.pre('save', function (next) {
  const total = Number(this.totalCost) || 0;
  const advance = Number(this.advanceCost) || 0;
  const tenure = Number(this.emiMonths) > 0 ? Number(this.emiMonths) : 1;
  const taxRate = Number(this.tax) || 0;

  this.remainingBalance = Math.max(0, total - advance);
  this.perMonthEmi = Math.round((this.remainingBalance / tenure) * 100) / 100;
  this.taxAmount = Math.round(((total * taxRate) / 100) * 100) / 100;
  this.grandTotal = Math.round((total + this.taxAmount) * 100) / 100;

  // Derive next active due date
  if (this.emiSchedule && this.emiSchedule.length > 0) {
    const nextUnpaid = this.emiSchedule.find((item) => item.status !== 'Paid' && item.status !== 'Cancelled');
    this.dueDate = nextUnpaid ? nextUnpaid.dueDate : null;

    const allPaid = this.emiSchedule.every((item) => item.status === 'Paid');
    if (allPaid && this.advanceStatus === 'Paid') {
      this.status = 'Completed';
    }
  }

  next();
});

module.exports = mongoose.model('Invoice', InvoiceSchema);