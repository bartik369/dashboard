import express from "express";
import messenderController from "../controllers/messenger-controller.js";

const router = express.Router();

router.get('/participants/:id', messenderController.getParticipants)
router.get('/conversations/:id', messenderController.getConversatios)
router.get('/active-conversation/:id', messenderController.getActiveConversation)
router.post('/conversation', messenderController.getConversation)
router.post('/new-conversation', messenderController.createConversation)
router.delete('/conversation/', messenderController.deleteConversation)
    // router.post('/set-active/', messenderController.setActiveConversation)

router.get('/messages/:id', messenderController.getMessages)
router.post('/message/', messenderController.getMessage)
router.post('/add-message/', messenderController.addMessage)
router.delete('/message/:id', messenderController.deleteMessage)
router.put('/message/:id', messenderController.updateMessage)
router.post('/mark-message/', messenderController.markMessage)

export default router;