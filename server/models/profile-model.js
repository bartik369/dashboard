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
    },
    city: {
        type: String,
        unique: false,
        required: false,
    },
    birthday: {
        type: String,
        unique: false,
        required: false,
    },
    phone: {
        type: String,
        unique: true,
        required: false,
    },
    work: {
        departament: {
            type: String,
            unique: false,
            required: false,
        },
        workPhone: {
            type: String,
            unique: false,
            required: false,
        },
        vocation: {
            type: String,
            unique: false,
            required: false,
        },
    },
    avatar: {
        type: String,
        unique: false,
        required: false,
    }
});

const Profile = mongoose.model('Profile', ProfileShema);
export default Profile;