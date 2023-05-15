import express from 'express';
import { getDevices, getDevice, getBasicDevices, createDevice, deleteDevice, updateDevice } from '../controllers/device-controller.js';

const router = express.Router();

router.get('/devices', getDevices);
router.get('/basic-devices', getBasicDevices);
router.get('/device/:id', getDevice);
router.post('/add', createDevice);
router.delete('/device/:id', deleteDevice);
router.put('/device/:id', updateDevice);

export default router;