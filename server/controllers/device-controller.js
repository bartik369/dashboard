import DeviceModel from '../models/device-model.js';
import { ObjectId } from 'mongodb';

export const getDevices = async(req, res) => {
    DeviceModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            const total = result.length
            res.set('X-Total-Count', total);
            res.send(result);
        }
    })
}

export const getDevice = async(req, res) => {
    const id = new ObjectId(req.params.id);
    DeviceModel.find({ _id: id }, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result);
    })
}

export const createDevice = async(req, res) => {
    const type = req.body.type;
    const name = req.body.name;
    const number = req.body.number;
    const user = req.body.user;
    const addTime = req.body.addTime;

    const device = new DeviceModel({
        type: type,
        name: name,
        number: number,
        user: user,
        addTime: addTime,
    })
    try {
        await device.save();
        res.send(device);
        console.log('Device data has been sent');
    } catch (error) {
        console.log(`There is an error ${error}`);
    }
}

export const deleteDevice = async(req, res) => {
    const id = req.params.id;
    try {
        await DeviceModel.findByIdAndRemove(id).exec();
        res.send({
            id: id,
        })

    } catch (error) {
        console.log(error)
    }
}


export const updateDevice = async(req, res) => {
    const id = req.params.id;
    const type = req.body.type;
    const name = req.body.name;
    const number = req.body.number;
    const user = req.body.user;
    const addTime = req.body.addTime;

    const rewriteUpdateData = await DeviceModel.findByIdAndUpdate(id, {
        type: type,
        name: name,
        number: number,
        user: user,
        addTime: addTime,
    })
    try {
        await rewriteUpdateData.save();
        res.send(rewriteUpdateData)
    } catch (error) {
        console.log(error)
    }
}