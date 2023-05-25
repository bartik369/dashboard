import mongoose from "mongoose";
const { Schema } = mongoose;

const MessagesSchema = new Schema({
    sender: {
        type: String,
        unique: true,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    time_created: {
        type: Date,
        date: new Date(),
    },
    converstationId: {
        type: String,
        unique: true,
        required: true,
    }
});

const Messages = mongoose.model('Messages', MessagesSchema);
export default Messages;