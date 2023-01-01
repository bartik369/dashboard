import express from 'express';
import { getTodos, getTodo, createTodo, deleteTodo, updateTodo } from '../controllers/todo-controller.js'


const router = express.Router();

router.get('/todos', getTodos);
router.get('/todo/:id', getTodo);
router.post('/newtodo', createTodo);
router.delete('/todo/:id', deleteTodo);
router.put('/todo/:id', updateTodo);


export default router;