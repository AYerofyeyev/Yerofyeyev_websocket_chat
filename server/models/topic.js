const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    publishedMessages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
});

module.exports = mongoose.model('Topic', topicSchema);
