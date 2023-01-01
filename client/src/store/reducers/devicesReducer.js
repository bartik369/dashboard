import { 
    GET_DEVICES, 
    ADD_DEVICES, 
    GET_DEVICE,
    DELETE_DEVICES, 
    UPDATE_DEVICES,} from "../types/typesDevices";

const initialState = {
    devices: [],
    device: {},
    loading: true, 
};

const devicesReducer = (state = initialState, action) => {

    switch(action.type) {
        case GET_DEVICES:
            return {
                ...state,
                devices: action.payload,
                loading: true,
            }
        case DELETE_DEVICES:
            return {
                ...state,
            }
        case ADD_DEVICES:
            return {
                ...state,
                device: action.payload,
            }
        case UPDATE_DEVICES:
                return {
                    ...state,
                }
        case GET_DEVICE:
            return {
                ...state,
                device: action.payload,
            }
        default:
            return state
    }
};

export default devicesReducer;