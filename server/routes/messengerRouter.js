import express from "express";
import messenderController from "../controllers/messenger-controller.js";

const router = express.Router();

router.get('/chats/:email', messenderController.getChats)
router.post('/chat', messenderController.getChat)
router.post('/create-chat', messenderController.createChat)
router.delete('/chat/', messenderController.deleteChat)
router.post('/active-chat/', messenderController.setActiveChat)

router.get('/messages/:id', messenderController.getMessages)
router.get('/messages/:id', messenderController.getMessage)
router.post('/add-message', messenderController.addMessage)
router.delete('/message/:id', messenderController.deleteMessage)
router.put('/message/:id', messenderController.updateMessage)
router.post('/mark-message/', messenderController.markMessage)

export default router;