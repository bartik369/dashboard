import mongoose from "mongoose";

const ToDoScheme = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    user: {
        type: String,
    }
});

const ToDo = mongoose.model("Todos", ToDoScheme);

export default ToDo;