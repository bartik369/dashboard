import mongoose from "mongoose";
const { Schema } = mongoose;

const CallSchema = new Schema({
    socketId: {
        type: String,
        unique: false,
        required: false,
        default: "",
    },
    userId: {
        type: String,
        unique: false,
        required: false,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

const Call = mongoose.model('Call', CallSchema);
export default Call;