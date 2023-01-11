import { MODAL_COMMON, MODAL_SPARE, MODALS_GET } from "../types/typesModal";

const modalsGet = () => ({
    type: MODALS_GET,
    loading: true,
});

const common = (status) => ({
    type: MODAL_COMMON,
    payload: status,
});

const spare = (status) => ({
    type: MODAL_SPARE,
    payload: status,
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

export const commonModal = (status) => {
    return function(dispatch) {
        try {
            dispatch(common(status));
            dispatch(modalsGet());
        } catch (error) {
            console.log(error)
        }
    }
}

export const spareModal = (status) => {
    return function(dispatch) {
        try {
            dispatch(spare(status));
            dispatch(modalsGet());
        } catch (error) {

        }
    }
}