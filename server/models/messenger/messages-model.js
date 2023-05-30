import mongoose from "mongoose";
const { Schema } = mongoose;

const MessagesSchema = new Schema({
    senderName: {
        type: String,
        unique: false,
        required: true,
    },
    senderEmail: {
        type: String,
        unique: true,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now
    },
    converstationId: {
        type: String,
        unique: true,
        required: true,
    }
});

const Messages = mongoose.model('Messages', MessagesSchema);
export default Messages;