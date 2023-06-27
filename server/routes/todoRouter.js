import express from 'express';
import todoController from '../controllers/todo-controller.js';
const router = express.Router()


router.get('/todos', todoController.getTodos);
router.post('/todo/', todoController.getTodo);
router.post('/newtodo', todoController.createTodo);
router.delete('/todo/:id', todoController.deleteTodo);
router.put('/todo/:id', todoController.updateTodo);


export default router;