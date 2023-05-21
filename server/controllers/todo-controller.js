import todoService from '../services/todo-service.js';
import { ObjectId } from 'mongodb';

class TodoController {

    async getTodos(req, res, next) {
        try {
            const todosData = await todoService.getTodos()

            if (!todosData) {

            }
            return res.json(todosData)
        } catch (error) {
            next(error)
        }
    }
    async getTodo(req, res, next) {
        try {
            const id = new ObjectId(req.params.id);
            const todoData = await todoService.getTodo(id)

            if (!todoData) {

            }

            return res.json(...todoData)
        } catch (error) {
            next(error)
        }
    }
    async createTodo(req, res, next) {
        try {
            const { title, description, status, startTime, endTime, user } = req.body;
            const todoData = await todoService.createTodo(
                title,
                description,
                status,
                startTime,
                endTime,
                user
            )
            if (!todoData) {

            }
            return res.json(todoData)
        } catch (error) {
            next(error)
        }
    }
    async deleteTodo(req, res, next) {
        try {
            const id = req.params.id;
            const todoData = await todoService.deleteTodo(id)
            if (!todoData) {

            }
            return res.json(todoData)
        } catch (error) {
            next(error)
        }
    }

    async updateTodo(req, res, next) {
        try {
            const id = req.params.id;
            const { title, description, status, startTime, endTime, user } = req.body;
            const todoData = await todoService.updateTodo(
                id,
                title,
                description,
                status,
                startTime,
                endTime,
                user
            )
            if (!todoData) {

            }
            return res.json(todoData)
        } catch (error) {
            next(error)
        }
    }
}


export default new TodoController();