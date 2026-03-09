const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    features: [String],
}, { _id: true });

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    images: [{ type: String }],
    description: { type: String, required: true },
    shortDesc: { type: String, default: '' },
    icon: { type: String, default: '🎉' },
    packages: [packageSchema],
    price: { type: Number, default: 0 },
    dateSlots: [{ type: Date }],
    features: [String],
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
