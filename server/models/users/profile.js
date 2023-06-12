import mongoose from "mongoose";
const { Schema } = mongoose;

const ProfileShema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        unique: false,
        required: false,
        default: "",
    },
    city: {
        type: String,
        unique: false,
        required: false,
        default: "",
    },
    birthday: {
        type: String,
        unique: false,
        required: false,
        default: "",
    },
    phone: {
        type: String,
        required: false,
        default: "",
    },
    work: {
        departament: {
            type: String,
            unique: false,
            required: false,
            default: "",
        },
        workPhone: {
            type: String,
            unique: false,
            required: false,
            default: "",
        },
        vocation: {
            type: String,
            unique: false,
            required: false,
            default: "",
        },
    },
    avatar: {
        type: String,
        unique: false,
        required: false,
        default: "",
    }
});

const Profile = mongoose.model('Profile', ProfileShema);
export default Profile;