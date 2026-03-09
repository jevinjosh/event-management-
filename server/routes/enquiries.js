const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const nodemailer = require('nodemailer');

// POST /api/enquiries — Submit new enquiry
router.post('/', async (req, res) => {
    try {
        const { fullName, email, phone, eventType, eventDate, guestCount, budgetRange, message, source } = req.body;

        if (!fullName || !email || !phone || !eventType) {
            return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
        }

        const enquiry = new Enquiry({
            fullName, email, phone, eventType, eventDate, guestCount, budgetRange, message, source
        });
        await enquiry.save();

        // Send confirmation email (best effort — don't fail if email fails)
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: `"EventHub Chennai" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_USER,
                subject: `New Enquiry from ${fullName} — ${eventType}`,
                html: `
          <h2>New Event Enquiry</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Event Type:</strong> ${eventType}</p>
          <p><strong>Event Date:</strong> ${eventDate || 'Not specified'}</p>
          <p><strong>Guests:</strong> ${guestCount || 'Not specified'}</p>
          <p><strong>Budget:</strong> ${budgetRange || 'Not specified'}</p>
          <p><strong>Message:</strong> ${message || 'No message'}</p>
          <p><strong>Source:</strong> ${source || 'website'}</p>
        `,
            });
        } catch (emailErr) {
            console.log('Email sending failed (non-critical):', emailErr.message);
        }

        res.status(201).json({ success: true, message: 'Enquiry submitted successfully! We\'ll contact you within 24 hours.' });
    } catch (error) {
        console.error('Enquiry error:', error);
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
    }
});

// GET /api/enquiries — Get all enquiries (admin)
router.get('/', async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json({ success: true, data: enquiries });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
