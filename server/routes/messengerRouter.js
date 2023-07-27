import express from "express";
import messenderController from "../controllers/messenger-controller.js";
import multerMidd from "../middlewares/file.js";

const router = express.Router();

router.get('/participants/:id', messenderController.getParticipants)
router.get('/conversations/:id', messenderController.getConversatios)
router.get('/active-conversation/:id', messenderController.getActiveConversation)
router.post('/conversation', messenderController.getConversation)
router.post('/new-conversation', messenderController.createConversation)
router.delete('/conversation/', messenderController.deleteConversation)
    // router.post('/set-active/', messenderController.setActiveConversation)

router.get('/messages/:id', messenderController.getMessages)
router.get('/media-messages/:id', messenderController.getMessagesMedia)
router.post('/last-messages/', messenderController.getLastMessages)
router.post('/message/', messenderController.getMessage)
router.post('/add-message/', multerMidd.single('file'), messenderController.addMessage)
router.delete('/message/:id', messenderController.deleteMessage)
router.put('/message/', multerMidd.single('file'), messenderController.updateMessage)
router.post('/mark-message/', messenderController.markMessage)

export default router;