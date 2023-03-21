import express from 'express';
import { getDevices, getDevice, createDevice, deleteDevice, updateDevice } from '../controllers/device-controller.js';

const router = express.Router();

router.get('/devices', getDevices);
router.get('/device/:id', getDevice);
router.post('/add', createDevice);
router.delete('/device/:id', deleteDevice);
router.put('/device/:id', updateDevice);

export default router;