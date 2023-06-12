import mongoose from "mongoose";
const { Schema } = mongoose;

const RolesRequestSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    displayname: {
        type: String,
        unique: false,
        required: true,
    },
    email: {
        type: String,
        unique: false,
        required: true,
    },
    role: {
        type: String,
        unique: false,
        required: true,
    },
});

const RolesRequest = mongoose.model('RolesRequest', RolesRequestSchema);
export default RolesRequest;