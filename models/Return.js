const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
    username: { type: String, required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', unique: true },
    dueDate: { type: Date, ref: 'Borrow' },
    fine: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Return', returnSchema);
