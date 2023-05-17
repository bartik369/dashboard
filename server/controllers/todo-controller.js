import ToDoModel from '../models/todo-model.js';
import { ObjectId } from 'mongodb';

export const getTodos = async(req, res) => {
    ToDoModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result)
        }
    })
}

export const getTodo = async(req, res, next) => {
    const id = new ObjectId(req.params.id);
    try {
        const todoData = await ToDoModel.find({ _id: id })
        return res.json(...todoData);
    } catch (error) {
        next(error)
    }
}

export const createTodo = async(req, res) => {
    console.log(req.body)
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const user = req.body.user;

    const todo = new ToDoModel({
        title: title,
        description: description,
        status: status,
        startTime: startTime,
        endTime: endTime,
        user: user,
    });

    try {
        await todo.save();
        res.send(todo);
        console.log('Todo data has been added');
    } catch (error) {
        console.log(`There is an error ${error}`)
    }
}

export const deleteTodo = async(req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        await ToDoModel.findByIdAndDelete(id).exec();
        res.send({
            id: id,
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateTodo = async(req, res) => {
    if (!req.body) return res.sendStatus(400);

    console.log(req.body)
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const user = req.body.user;

    const rewriteUpdateData = await ToDoModel.findByIdAndUpdate(id, {
        title: title,
        description: description,
        status: status,
        startTime: startTime,
        endTime: endTime,
        user: user,
    })
    try {
        await rewriteUpdateData.save();
        res.send(rewriteUpdateData)
    } catch (error) {
        console.log(error);
    }
}