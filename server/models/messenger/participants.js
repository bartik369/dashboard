import mongoose from "mongoose";
const { Schema } = mongoose;

const ParticipantsSchema = new Schema({
    participants: [],
    visible: [],
    conversationId: {
        type: String,
        unique: true,
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
});

const Participants = mongoose.model('Participants', ParticipantsSchema);
export default Participants;