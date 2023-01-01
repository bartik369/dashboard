import mongoose from 'mongoose';

const DeviceScheme = new mongoose.Schema({
    type: {
        type: String,
        require: true,
    },
    name: {
        type: String
    },
    number: {
        type: String
    },
    user: {
        type: String,
        require: true,
    },
    addTime: {
        type: String,
    },
})

const Device = mongoose.model("DeviceData", DeviceScheme);

export default Device;