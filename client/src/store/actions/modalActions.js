import { MODAL_ADD, MODAL_UPDATE, MODALS_GET, RESET_INPUT } from "../types/typesModal";

const modalsGet = () => ({
    type: MODALS_GET,
    loading: true,
});

const modalAdding = (status) => ({
    type: MODAL_ADD,
    payload: status,
})


const modalUpdating = (status) => ({
    type: MODAL_UPDATE,
    payload: status,
});

const resetInput = () => ({
    type: RESET_INPUT,
});

export const loadModalStatus = () => {
    return function(dispatch) {
        try {
            dispatch(modalsGet());
        } catch (error) {
            console.log(error)
        }
    }
};

export const addModal = (status) => {
    return function(dispatch) {
        try {
            dispatch(modalAdding(status));
            dispatch(modalsGet());
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateModal = (status) => {
    return function(dispatch) {
        try {
            dispatch(modalUpdating(status));
            dispatch(modalsGet());
        } catch (error) {

        }
    }
}
export const resetInputFill = () => {
    return function(dispatch) {
        try {
            dispatch(resetInput());
        } catch (error) {

        }
    }
}