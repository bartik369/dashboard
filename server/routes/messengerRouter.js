import express from "express";
import messenderController from "../controllers/messenger-controller.js";

const router = express.Router();

router.get('/chats/:email', messenderController.getChats)
router.post('/chat', messenderController.getChat)
router.post('/create-chat', messenderController.createChat)
router.delete('/chat/:id', messenderController.deleteChat)

router.get('/messages/:id', messenderController.getMessages)
router.get('/messages/:id', messenderController.getMessage)
router.post('/add-message', messenderController.addMessage)
router.delete('/message/:id', messenderController.deleteMessage)
router.put('/message/:id', messenderController.updateMessage)

export default router;