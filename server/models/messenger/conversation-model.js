import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema({
    participants: [],
    visible: [],
    active: {
        type: Boolean,
        default: false,
    },
});

const Conversation = mongoose.model('Conversation', ConversationSchema);
export default Conversation;