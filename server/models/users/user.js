import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    roles: [{
        type: String,
        ref: 'Roles',
    }],
});

const User = mongoose.model('User', UserSchema);
export default User;