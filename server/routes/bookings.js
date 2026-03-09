const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const QRCode = require('qrcode');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

// POST /api/bookings/create-order
router.post('/create-order', protect, async (req, res) => {
    try {
        const { eventId, date, packageName, tickets, addOns = [] } = req.body;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Calculate price
        const pkg = event.packages.find(p => p.name === packageName);
        const basePrice = pkg ? pkg.price : event.price;
        const addOnsTotal = addOns.reduce((sum, a) => sum + (a.price || 0), 0);
        const totalPrice = (basePrice * tickets) + addOnsTotal;

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: totalPrice * 100, // paise
            currency: 'INR',
            receipt: `booking_${Date.now()}`,
            notes: { eventId, userId: req.user._id.toString() },
        });

        // Create booking
        const booking = await Booking.create({
            user: req.user._id,
            event: eventId,
            date,
            package: packageName,
            tickets,
            addOns,
            totalPrice,
            razorpayOrderId: razorpayOrder.id,
            status: 'pending',
        });

        res.status(201).json({
            booking,
            razorpayOrder: {
                id: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
            },
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ message: error.message });
    }
});

// POST /api/bookings/verify-payment
router.post('/verify-payment', protect, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

        // Verify signature
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: 'Payment verification failed' });
        }

        // Update booking
        const booking = await Booking.findById(bookingId).populate('event', 'title').populate('user', 'name email');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        // Generate QR code
        const qrData = JSON.stringify({
            bookingId: booking._id,
            user: booking.user.name,
            event: booking.event.title,
            date: booking.date,
            package: booking.package,
            tickets: booking.tickets,
            paymentId: razorpay_payment_id,
        });
        const qrCode = await QRCode.toDataURL(qrData);

        booking.razorpayPaymentId = razorpay_payment_id;
        booking.razorpaySignature = razorpay_signature;
        booking.qrCode = qrCode;
        booking.status = 'confirmed';
        await booking.save();

        res.json({ booking, message: 'Payment verified successfully' });
    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({ message: error.message });
    }
});

// GET /api/bookings/user — user's bookings
router.get('/user', protect, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('event', 'title category icon images')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/bookings/admin — all bookings (admin)
router.get('/admin', protect, adminOnly, async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('event', 'title category')
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
