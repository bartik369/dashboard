import DeviceModel from '../models/device-model.js'

class DeviceService {
    async getBasicDevices() {
        try {
            const devicesData = DeviceModel.find({});
            if (!devicesData) {

            }
            return devicesData
        } catch (error) {

        }
    }
    async getDevice(id) {
        try {
            const deviceData = await DeviceModel.find({ _id: id })

            if (!deviceData) {

            }

            return deviceData
        } catch (error) {

        }
    }
    async createDevice(type, name, number, user, addTime) {
        try {
            const deviceData = new DeviceModel({
                type: type,
                name: name,
                number: number,
                user: user,
                addTime: addTime,
            })
            await deviceData.save();
            return deviceData
        } catch (error) {

        }
    }
    async deleteDevice(id) {
        try {
            const deviceData = await DeviceModel.findByIdAndRemove(id).exec();

            if (!deviceData) {

            }
            return deviceData;

        } catch (error) {

        }
    }
    async updateDevice(id, type, name, number, user, addTime) {
        try {
            const deviceData = await DeviceModel.findByIdAndUpdate(id, {
                type: type,
                name: name,
                number: number,
                user: user,
                addTime: addTime,
            })
            if (!deviceData) {

            }
            await deviceData.save()
            return deviceData

        } catch (error) {

        }
    }
}

export default new DeviceService();