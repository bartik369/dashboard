import axios from "axios";
import ENV from "../../env.config";
import {
    GET_TODOS,
    GET_TODO,
    ADD_TODOS,
    DELETE_TODOS,
    UPDATE_TODOS,
} from "../types/typesTodos.js";


const getTodos = (todos) => ({
    type: GET_TODOS,
    payload: todos,
    loading: true,
});

const todoAdded = (todo) => ({
    type: ADD_TODOS,
    payload: todo,
})

const todoDelete = () => ({
    type: DELETE_TODOS,
})

const getTodo = (todo) => ({
    type: GET_TODO,
    payload: todo,
})

const todoUpdate = () => ({
    type: UPDATE_TODOS,
})


export const loadTodos = () => {
    return async function(dispatch) {
        try {
            await axios.get(`${ENV.HOSTNAME}todos`)
                .then((response) => {
                    dispatch(getTodos(response.data));
                });
        } catch (error) {
            console.log(error);
        }
    }

}

export const addTodo = (todo) => {
    return async function(dispatch) {
        try {
            await axios.post(`${ENV.HOSTNAME}newtodo`, todo)
                .then((response) => {
                    dispatch(todoAdded(response.data));
                    dispatch(loadTodos());
                })
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteTodo = (id) => {
    return async function(dispatch) {
        try {
            await axios.delete(`${ENV.HOSTNAME}todo/${id}`)
                .then((response) => {
                    dispatch(todoDelete(response.data));
                    dispatch(loadTodos());
                })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getSingleTodo = (id) => {

    return async function(dispatch) {
        try {
            await axios.get(`${ENV.HOSTNAME}todo/${id}`)
                .then((response) => {
                    dispatch(getTodo(response.data[0]));
                })
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateTodo = (todo, id) => {

    return async function(dispatch) {
        try {
            await axios.put(`${ENV.HOSTNAME}todo/${id}`, todo)
                .then((response) => {
                    dispatch(todoUpdate(response.data));
                    dispatch(loadTodos());
                })
        } catch (error) {
            console.log(error);
        }
    }
}