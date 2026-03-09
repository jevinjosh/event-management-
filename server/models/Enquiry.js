const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    eventType: { type: String, required: true, trim: true },
    eventDate: { type: String },
    guestCount: { type: String },
    budgetRange: { type: String },
    message: { type: String },
    source: { type: String, default: 'website' },
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
