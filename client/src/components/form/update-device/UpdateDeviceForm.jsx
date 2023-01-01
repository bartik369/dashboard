import React, { useState, useEffect } from "react";
import FormInput from "../FormInput";
import { useDispatch, useSelector } from "react-redux";
import { loadDevices, updateDevice } from "../../../store/actions/devicesActions";
import { updateModal } from "../../../store/actions/modalActions";

const UpdateDeviceForm = ({ modal, update }) => {
  const [editDevice, setEditDevice] = useState({
    id: "",
    type: "",
    name: "",
    number: "",
    user: "",
    addTime: "",
  });
  const [errors, setErrors] = useState(
    {
      type: "",
      name: "",
      number: "",
      user: "",
    }
  );
  const [validForm, setValidForm] = useState(false);

  let dispatch = useDispatch();
  const {device} = useSelector(state => state.device);

  useEffect(() => {
    dispatch(loadDevices());
    setEditDevice({...device})
  }, [device, dispatch]);


  useEffect(() => {
    if (editDevice.type !== "" 
    && editDevice.name !== "" 
    && editDevice.number !== "" 
    && editDevice.user !== "") {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [editDevice.type, editDevice.name, editDevice.number, editDevice.user]);


  const handleUpdateDevice = (e) => {
    e.preventDefault();
    const date = new Date();
    const deviceTime =
      date.toLocaleDateString() + " " + date.toLocaleTimeString("en-GB");
    const updateDeviceData = {
      id: editDevice._id,
      type: editDevice.type,
      name: editDevice.name,
      number: editDevice.number,
      user: editDevice.user,
      addTime: deviceTime,
    };
    dispatch(updateDevice(updateDeviceData, updateDeviceData.id));
    dispatch(updateModal(false));
  };

  const deviceTypeArray = [
    {name: 'Компьютеры', value: 'pc'},
    {name: 'Сетевое оборудование', value: 'network'},
    {name: 'Принтеры', value: 'printers'},
    {name: 'Телефоны', value: 'phones'},
    {name: 'Аксессуары', value: 'accessories'},
  ];

  const validate = (name, value) => {
    const checkRegExpOne = new RegExp(/^[а-яА-ЯёЁa-zA-Z0-9]+$|\s/i).test(value);
    const checkRegExpTwo = new RegExp(/^[а-яА-ЯёЁa-zA-Z]+$|\s/i).test(value);
    switch (name) {
      case "type":
        !new RegExp(/^[^\s]/).test(value)
          ? setErrors({...errors, type: "Укажите тип устройства"})
          : setErrors({...errors, type: ""})
        break;
      case "name":
        !checkRegExpOne
          ? setErrors({...errors, name: "Введите корректное имя"})
          : setErrors({...errors, name: ""})
        break;
      case "number":
        !checkRegExpOne
          ? setErrors({...errors, number: "Введите корректный номер"})
          : setErrors({...errors, number: ""})
        break;
      case "user":
        !checkRegExpTwo
          ? setErrors({...errors, user: "Введите корректное имя"})
          : setErrors({...errors, user: ""})
        break;
      default:
        break;
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    validate(name, value)
    setEditDevice({...editDevice, [name]: value});
  }

  return (
    <form className="add-device-form">
      {errors.type && <div className="form-error">{errors.type}</div>}
       <select
      name="type" 
      id="typeDevice"
      value={editDevice.type || ""} 
      onChange={(e) => handleChange(e)}
      >
        <option value="" disabled="disabled">Тип устройства</option>
        {deviceTypeArray.map((item, index) => (
            <option key={index}>{item.name}</option>
        ))}
      </select>
      {errors.name && <div className="form-error">{errors.name}</div>}
      <FormInput
        placeholder="Название устройства"
        name="name"
        type="text"
        value={editDevice.name || ""}
        onChange={(e) => handleChange(e)}
      />
      {errors.number && <div className="form-error">{errors.number}</div>}
      <FormInput
        placeholder="Номер устройства"
        name="number"
        type="text"
        value={editDevice.number || ""}
        onChange={(e) => handleChange(e)}
      />
      {errors.user && <div className="form-error">{errors.user}</div>}
      <FormInput
        placeholder="Имя пользователя"
        name="user"
        type="text"
        value={editDevice.user || ""}
        onChange={(e) => handleChange(e)}
      />
      <button disabled={!validForm} type="submit" className="add-btn" onClick={(e) => handleUpdateDevice(e)}>
        Обновить
      </button>
    </form>
  );
};

export default UpdateDeviceForm;
