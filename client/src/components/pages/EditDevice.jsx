import React, { useState, useEffect } from "react";
import { useHistory, useLocaion, useParams } from "react-router-dom";
import "../../styles/App.css";
import FormInput from "../form/FormInput";
import Axios from "axios";
import axios from "axios";

const EditDevice = (props) => {
  const [device, setDevice] = useState({
    id: "",
    type: "",
    name: "",
    number: "",
    user: "",
    addTime: "",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleDevice(id);
    }
  }, [id]);

  const getSingleDevice = async (id) => {
    const response = await Axios.get(`http://localhost:5001/device/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  };

  const addDevice = async (data) => {
    const response = await axios("http://localhost:5001/device/", data);
    setDevice(...device, response.data);
  };

  const updateDevice = async (data, id) => {
    const response = await axios.post(
      `http://localhost:5001/device/${id}`,
      data
    );
    setDevice(response.data);
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setDevice({ ...device, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!id) {
      addDevice(device);
    } else {
      updateDevice(device, id);
    }
  };

  return (
    <div className="edit-device">
      <form className="add-device-form">
        <FormInput
          placeholder="Тип устройства"
          type="text"
          name="deviceType"
          id="deviceType"
          value={device.type}
          onChange={handleInputChange}
        />
        <FormInput
          placeholder="Название устройства"
          type="text"
          name="deviceName"
          id="deviceName"
          value={device.name}
          onChange={handleInputChange}
        />
        <FormInput
          placeholder="Номер устройства"
          type="text"
          name="deviceNumber"
          id="deviceNumber"
          value={device.number}
          onChange={handleInputChange}
        />
        <FormInput
          placeholder="Имя пользователя"
          type="text"
          name="userName"
          id="userName"
          value={device.user}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={handleUpdate}>
          Обновить
        </button>
      </form>
    </div>
  );
};

export default EditDevice;
