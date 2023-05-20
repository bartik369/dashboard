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

// async(req, res) => {

//     ToDoModel.find({}, (err, result) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(result)
//         }
//     })
// }

// export const getTodo = async(req, res, next) => {
//     const id = new ObjectId(req.params.id);
//     try {
//         const todoData = await ToDoModel.find({ _id: id })
//         return res.json(...todoData);
//     } catch (error) {
//         next(error)
//     }
// }

// export const createTodo = async(req, res) => {
//     const title = req.body.title;
//     const description = req.body.description;
//     const status = req.body.status;
//     const startTime = req.body.startTime;
//     const endTime = req.body.endTime;
//     const user = req.body.user;

//     const todo = new ToDoModel({
//         title: title,
//         description: description,
//         status: status,
//         startTime: startTime,
//         endTime: endTime,
//         user: user,
//     });

//     try {
//         await todo.save();
//         res.send(todo);
//     } catch (error) {
//         console.log(`There is an error ${error}`)
//     }
// }

// export const deleteTodo = async(req, res) => {
//     const id = req.params.id;
//     console.log(id)
//     try {
//         await ToDoModel.findByIdAndDelete(id).exec();
//         res.send({
//             id: id,
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const updateTodo = async(req, res) => {

//     if (!req.body) return res.sendStatus(400);
//     const id = req.params.id;
//     const title = req.body.title;
//     const description = req.body.description;
//     const status = req.body.status;
//     const startTime = req.body.startTime;
//     const endTime = req.body.endTime;
//     const user = req.body.user;

//     const rewriteUpdateData = await ToDoModel.findByIdAndUpdate(id, {
//         title: title,
//         description: description,
//         status: status,
//         startTime: startTime,
//         endTime: endTime,
//         user: user,
//     })
//     try {
//         await rewriteUpdateData.save();
//         res.send(rewriteUpdateData)
//     } catch (error) {
//         console.log(error);
//     }
// }