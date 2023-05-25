import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    participants: []
});

const Conversation = mongoose.model('Conversation', ConversationSchema);
export default Conversation;