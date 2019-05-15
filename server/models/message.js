const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    pros: {
        type: Boolean,
        required: true
    },
    concernedTopic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    }
});

module.exports = mongoose.model('Message', messageSchema);
