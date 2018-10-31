const mongoose = require('mongoose');

var RecyclingSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        min: 0o0000,
        max: 99999,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    notes: {
        type: [String],
        required: false
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    }
})

module.exports = mongoose.model('Recycling', RecyclingSchema)