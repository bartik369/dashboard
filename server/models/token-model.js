import mongoose from "mongoose";
const { Schema } = mongoose;

const TokenScheme = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    refreshToken: {
        type: String,
        required: true,
    },
});

const Token = mongoose.model('Token', TokenScheme);
export default Token;
