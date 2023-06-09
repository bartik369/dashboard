import mongoose from "mongoose";
const { Schema } = mongoose;

const ResetPasswordShema = new Schema({
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

const ResetPasswordModel = mongoose.model('ResetPassword', ResetPasswordShema);
export default ResetPasswordModel;