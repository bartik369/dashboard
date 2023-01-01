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
});

const ToDo = mongoose.model("TodoData", ToDoScheme);

export default ToDo;