import mongoose from "mongoose";
const { Schema } = mongoose;

const RolesSchema = new Schema({
    value: {
        type: String,
        unique: true,
        default: 'User'
    }
})

const Roles = mongoose.model('Roles', RolesSchema);
export default Roles;