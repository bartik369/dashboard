import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema({
    participants: []
});

const Conversation = mongoose.model('Conversation', ConversationSchema);
export default Conversation;