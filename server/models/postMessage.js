const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
    creator: String,
    user: {
        type: ObjectId,
        ref: "Users"
    },
    content: String,
    mediaFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const postMessage = mongoose.model('postSchema', postSchema);
module.exports = postMessage;