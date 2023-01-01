import {MODAL_ADD, MODAL_UPDATE, MODALS_GET } from "../types/typesModal";

const initialState = {
    modal: 
        { 
         update: false,
         add: false,
        }

};

const modalReducer = (state = initialState, action) => {
    switch(action.type) {
        case MODALS_GET:
            return {
                ...state,
                modal: action.payload,
                loading: true,
            }
        case MODAL_ADD:
            return {
                ...state,
               add: action.payload,
            }
        case MODAL_UPDATE:
            return {
                ...state,
                update: action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}

export default modalReducer;