import mongoose from "mongoose";
const { Schema } = mongoose;

const LinkSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    activationLink: {
        type: String,
    },
});

const ActivateLink = mongoose.model('ActivateLink', LinkSchema);
export default ActivateLink;