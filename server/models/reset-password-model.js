import mongoose from "mongoose";
const { Schema } = mongoose;

const ResetPasswordSheme = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    link: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '500s' }
    }
});

const ResetPasswordModel = mongoose.model('ResetPassword', ResetPasswordSheme);
export default ResetPasswordModel;