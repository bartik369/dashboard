import express from 'express';
import deviceController from '../controllers/device-controller.js';

const router = express.Router();

router.get('/devices', deviceController.getDevices);
router.get('/basic-devices', deviceController.getBasicDevices);
router.post('/device/', deviceController.getDevice);
router.post('/add', deviceController.createDevice);
router.delete('/device/:id', deviceController.deleteDevice);
router.put('/device/:id', deviceController.updateDevice);

export default router;