const express = require('express');
const router = express.Router();
const {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  updateEmiStatus,
  updateAdvanceStatus,
  deleteInvoice
} = require('../controllers/invoiceController');

router.route('/')
  .get(getInvoices)
  .post(createInvoice);

router.route('/:id')
  .get(getInvoiceById)
  .put(updateInvoice)
  .delete(deleteInvoice);

router.patch('/:id/emi/:installmentNo', updateEmiStatus);
router.patch('/:id/advance-status', updateAdvanceStatus);

module.exports = router;