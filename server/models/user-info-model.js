import mongoose from "mongoose";
const { Schema } = mongoose;

const ProfileInfoShema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
        type: Number,
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
            type: Number,
            unique: false,
            required: false,
        },
        vocation: {
            type: Number,
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

const ProfileInfo = mongoose.model('ProfileInfo', ProfileInfoShema);
export default ProfileInfo;