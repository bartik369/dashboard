import axios from "axios";
import ENV from "../../env.config";
import {
    GET_DEVICES,
    GET_DEVICE,
    ADD_DEVICES,
    DELETE_DEVICES,
    UPDATE_DEVICES,
} from "../types/typesDevices";


const getDevices = (devices) => ({
    type: GET_DEVICES,
    payload: devices,
    loading: true,
})

const getDevice = (device) => ({
    type: GET_DEVICE,
    payload: device,
})


const deviceDeleted = () => ({
    type: DELETE_DEVICES,
})

const deviceAdd = () => ({
    type: ADD_DEVICES,
})

const deviceUpdate = () => ({
    type: UPDATE_DEVICES,
})

export const loadDevices = () => {
    return async function(dispatch) {
        try {
            await axios.get(`${ENV.HOSTNAME}devices`)
                .then((response) => {
                    dispatch(getDevices(response.data));
                })
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteDevice = (id) => {
    return async function(dispatch) {
        try {
            await axios.delete(`${ENV.HOSTNAME}device/${id}`)
                .then((response) => {
                    dispatch(deviceDeleted(response.data));
                    dispatch(loadDevices());
                })
        } catch (error) {
            console.log(error);
        }
    }
}

export const addDevice = (device) => {
    console.log(device)
    return async function(dispatch) {
        try {
            await axios.post(`${ENV.HOSTNAME}insert`, device)
                .then((response) => {
                    dispatch(deviceAdd(response.data));
                    dispatch(loadDevices());
                })
        } catch (error) {
            console.log(error);
        }
    }

}

export const getsingleDevice = (id) => {
    return async function(dispatch) {
        try {
            await axios.get(`${ENV.HOSTNAME}device/${id}`)
                .then((response) => {
                    dispatch(getDevice(response.data[0]))
                })
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateDevice = (device, id) => {
    return async function(dispatch) {
        try {
            await axios.put(`${ENV.HOSTNAME}device/${id}`, device)
                .then((response) => {
                    dispatch(deviceUpdate(response.data));
                    dispatch(loadDevices());
                })
        } catch (error) {
            console.log(error);
        }
    }
}