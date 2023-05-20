import TodoModel from "../models/todo-model.js";

class TodoService {
    async getTodos() {
        try {
            const todosData = await TodoModel.find({});
            return todosData;
        } catch (error) {}
    }

    async getTodo(id) {
        try {
            const todoData = await TodoModel.find({ _id: id });
            return todoData;
        } catch (error) {}
    }

    async createTodo(title, description, status, startTime, endTime, user) {
        try {
            const todoData = new TodoModel({
                title: title,
                description: description,
                status: status,
                startTime: startTime,
                endTime: endTime,
                user: user,
            });
            await todoData.save();
            return todoData;
        } catch (error) {}
    }
    async deleteTodo(id) {
        try {
            const todoData = await TodoModel.findByIdAndDelete(id).exec();
            return todoData;
        } catch (error) {}
    }

    async updateTodo(id, title, description, status, startTime, endTime, user) {
        try {
            const todoData = await TodoModel.findByIdAndUpdate(id, {
                title: title,
                description: description,
                status: status,
                startTime: startTime,
                endTime: endTime,
                user: user,
            });
            await todoData.save()
            return todoData
        } catch (error) {}
    }
}

export default new TodoService();