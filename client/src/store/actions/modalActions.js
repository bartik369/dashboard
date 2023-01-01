import { MODAL_ADD, MODAL_UPDATE, MODALS_GET } from "../types/typesModal";

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


export const loadModalStatus = () => {
    return function(dispatch) {
        try {
            dispatch(modalsGet());
        } 
        catch (error) {
            console.log(error)
        }
    }
};

export const addModal = (status) => {
    return function(dispatch) {
        try {
            dispatch(modalAdding(status));
            dispatch(modalsGet());        } 
        catch (error) {
            console.log(error)
        }
    }
}

export const updateModal = (status) => {
    return function(dispatch)  {
       try {
        dispatch(modalUpdating(status));
        dispatch(modalsGet());
       } 
       catch (error) {
        
       }
    }
}