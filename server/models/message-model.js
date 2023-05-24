import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageShema = new Schema({
    sentByUser: {
        type: String,
        unique: true,
        required: true,
    },
    sentFromUser: {
        type: String,
        unique: true,
        required: true,
    },
    message: {
        type: String,
        unique: false,
        required: true,
    },
    timestamp: time,
});

const Message = mongoose.model('Message', MessageShema);
export default Message;