const express = require('express');
const Event = require('../models/Event');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/events — public
router.get('/', async (req, res) => {
    try {
        const { category, search, limit } = req.query;
        const filter = { isActive: true };
        if (category) filter.category = category;
        if (search) filter.title = { $regex: search, $options: 'i' };
        const events = await Event.find(filter)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit) || 100);
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/events/:id — public
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/events — admin
router.post('/', protect, adminOnly, async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/events/:id — admin
router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/events/:id — admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
