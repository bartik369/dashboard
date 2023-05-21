import deviceService from '../services/device-service.js';
import DeviceModel from '../models/device-model.js'
import { ObjectId } from 'mongodb';

class DeviceController {

    async getDevices(req, res) {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 12;
        const search = req.query.search || "";
        const category = req.query.category || "";

        let data = await DeviceModel.find({
                $or: [
                    { type: { $regex: search, $options: "i" } },
                    { name: { $regex: search, $options: "i" } },
                    { number: { $regex: search, $options: "i" } },
                    { user: { $regex: search, $options: "i" } },
                ]
            })
            .skip(page * limit)
            .limit(limit)
        let total = await DeviceModel.countDocuments({
            $or: [
                { type: { $regex: search, $options: "i" } },
                { name: { $regex: search, $options: "i" } },
                { number: { $regex: search, $options: "i" } },
                { user: { $regex: search, $options: "i" } },
            ]
        })
        let pageCount = Math.ceil(total / limit)

        res.json({
            data,
            total,
            page: page + 1,
            limit,
            pageCount,
        })
    }

    async getBasicDevices(req, res, next) {
        try {
            const devicesData = await deviceService.getBasicDevices()

            if (!devicesData) {

            }

            return res.json(devicesData)

        } catch (error) {

        }
    }

    async getDevice(req, res, next) {
        try {
            const id = new ObjectId(req.params.id);
            const deviceData = await deviceService.getDevice(id)

            if (!deviceData) {

            }
            return res.json(...deviceData)
        } catch (error) {

        }
    }

    async createDevice(req, res, next) {
        try {
            const { type, name, number, user, addTime } = req.body;
            const deviceData = deviceService.createDevice(type, name, number, user, addTime)

            if (!deviceData) {

            }
            return res.json(deviceData)
        } catch (error) {

        }
    }

    async deleteDevice(req, res, next) {
        const id = req.params.id;
        try {
            const deviceData = deviceService.deleteDevice(id)

            if (!deviceData) {

            }
            return res.json(deviceData)
        } catch (error) {

        }
    }

    async updateDevice(req, res, next) {
        try {
            const { id, type, name, number, user, addTime } = req.body;
            const deviceData = await deviceService.updateDevice(id, type, name, number, user, addTime)

            if (!deviceData) {

            }
            return res.json(deviceData)

        } catch (error) {

        }
    }

}

// export const getDevices = async(req, res) => {
//     const page = parseInt(req.query.page) - 1 || 0;
//     const limit = parseInt(req.query.limit) || 12;
//     const search = req.query.search || "";
//     const category = req.query.category || "";

//     let data = await DeviceModel.find({
//             $or: [
//                 { type: { $regex: search, $options: "i" } },
//                 { name: { $regex: search, $options: "i" } },
//                 { number: { $regex: search, $options: "i" } },
//                 { user: { $regex: search, $options: "i" } },
//             ]
//         })
//         .skip(page * limit)
//         .limit(limit)
//     let total = await DeviceModel.countDocuments({
//             $or: [
//                 { type: { $regex: search, $options: "i" } },
//                 { name: { $regex: search, $options: "i" } },
//                 { number: { $regex: search, $options: "i" } },
//                 { user: { $regex: search, $options: "i" } },
//             ]
//         })
//     let pageCount = Math.ceil(total / limit)

//     res.json({
//         data,
//         total,
//         page: page + 1,
//         limit,
//         pageCount,
//     })
// }


// export const getBasicDevices = async(req, res) => {
//     DeviceModel.find({}, (err, result) => {
//         if (err) {
//             res.send(err)
//         } else {
//             const total = result.length
//             res.set('X-Total-Count', total);
//             res.send(result);
//         }
//     })
// }

// export const getDevice = async(req, res, next) => {
//     const id = new ObjectId(req.params.id);
//     try {
//         const deviceData = await DeviceModel.find({ _id: id })
//         return res.json(...deviceData)
//     } catch (error) {
//         next(error)
//     }
// }

// export const createDevice = async(req, res) => {
//     const type = req.body.type;
//     const name = req.body.name;
//     const number = req.body.number;
//     const user = req.body.user;
//     const addTime = req.body.addTime;

//     const device = new DeviceModel({
//         type: type,
//         name: name,
//         number: number,
//         user: user,
//         addTime: addTime,
//     })
//     try {
//         await device.save();
//         res.send(device);
//         console.log('Device data has been sent');
//     } catch (error) {
//         console.log(`There is an error ${error}`);
//     }
// }

// export const deleteDevice = async(req, res) => {
//     const id = req.params.id;
//     try {
//         await DeviceModel.findByIdAndRemove(id).exec();
//         res.send({
//             id: id,
//         })

//     } catch (error) {
//         console.log(error)
//     }
// }


// export const updateDevice = async(req, res) => {
//     const id = req.body.id;
//     const type = req.body.type;
//     const name = req.body.name;
//     const number = req.body.number;
//     const user = req.body.user;
//     const addTime = req.body.addTime;

//     const rewriteUpdateData = await DeviceModel.findByIdAndUpdate(id, {
//         type: type,
//         name: name,
//         number: number,
//         user: user,
//         addTime: addTime,
//     })
//     try {
//         await rewriteUpdateData.save();
//         res.send(rewriteUpdateData)
//     } catch (error) {
//         console.log(error)
//     }
// }

export default new DeviceController();