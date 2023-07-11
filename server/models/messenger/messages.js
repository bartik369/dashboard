import mongoose from "mongoose";
const { Schema } = mongoose;

const MessagesSchema = new Schema({
    conversationId: {
        type: String,
        unique: false,
        required: true,
    },
    senderId: {
        type: String,
        unique: false,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false,
    }
});

const Messages = mongoose.model('Messages', MessagesSchema);
export default Messages;