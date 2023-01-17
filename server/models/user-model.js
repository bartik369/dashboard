import mongoose from "mongoose";
const { Schema } = mongoose;

const UserScheme = new Schema({
    displayname: {
        type: String,
        unique: false,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    activationLink: {
        type: String,
    },
    roles: [{
        type: String,
        ref: 'Roles',
    }],
});

const User = mongoose.model('User', UserScheme);
export default User;