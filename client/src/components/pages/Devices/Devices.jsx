import React, { useEffect, useState } from "react";
import Modal from "../../UI/modal/Modal";
import UpdateDeviceForm from "../../form/update-device/UpdateDeviceForm";
import AddDevice from "../../form/add-device/AddDevice";
import Pagination from "../../UI/pagination/Pagination";
import CategoryMenu from "./CategoryMenu";
import * as deviceConstants from "../../../utils/constants/content.constants";
import { useDispatch, useSelector } from "react-redux";
import { deleteDevice, getsingleDevice, loadDevices, addDevice, updateDevice} from "../../../store/actions/devicesActions";
import "../../../styles/App.css";
import "./devices.css";

const Devices = () => {


  const [activeModal, setActiveModal] = useState(null);
  let dispatch = useDispatch();
  const {devices} = useSelector(state => state.devices);
  const searchQuery = useSelector(state => state.seqrchQuery.query);
  const [category, setCategory] = useState([])

  useEffect(() => {
    dispatch(loadDevices());
  }, [dispatch])


  const [currentPage, setCurrentPage] = useState(1);
  const [devicesPerPage] = useState(25);
  
      // Pagination

      const indexOfLastDevice = currentPage * devicesPerPage;
      const indefOfFirstDevice = indexOfLastDevice - devicesPerPage;
        // const [updateDeviceId, setUpdateDeviceId] = useState("");

  useEffect(() => {
    const filter = devices.filter((item) => {
      return Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }).slice(indefOfFirstDevice, indexOfLastDevice)
    setCategory(filter)
  }, [devices, searchQuery, indexOfLastDevice, indefOfFirstDevice]);

  const closeModalHandler = () => {
    setActiveModal(false);
  }


  // Search device

  const pageNumberHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const createDevice = (newDevice) => {
    dispatch(addDevice(newDevice));
  }

  // Delete device

  function removeDevice(id) {
    dispatch(deleteDevice(id));
  }

  // Update device

  
  const handleUpdateDeviceInfo = (id) => {
    setActiveModal(true);
    dispatch(getsingleDevice(id));
  }

  const updateDeviceData = (updateData) => {
    dispatch(updateDevice(updateData, updateData.id));
    setActiveModal(false);
  }

  // Create device
  
  const findNow = (category) => {
    const myTestArray = devices.filter((item) => {

      if (item.type === category) {
        return item.type
      }
    }).slice(indefOfFirstDevice, indexOfLastDevice);
    setCategory(myTestArray)
  }
  const resetHandler = () => {
    setCategory(devices)
  }

  return (
    <div className="content-container__inner">
      <div className="devices-category">
        <CategoryMenu sortCategory={findNow} reset={resetHandler}/>
      </div>
      <Modal active={activeModal}>
        <UpdateDeviceForm update={updateDeviceData} close={closeModalHandler}/>
      </Modal>
      <div className="devices-list">
      <div className="title">Список устройств</div>
      <table className="devices-table">
              <thead>
                  <tr>
                      <th>{deviceConstants.deviceType}</th>
                      <th>{deviceConstants.deviceName}</th>
                      <th>{deviceConstants.deviceNumber}</th>
                      <th>{deviceConstants.deviceUser}</th>
                      <th>{deviceConstants.deviceDateAdded}</th>
                      <th></th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {category.map((device, index) => (
                      <tr key={index}>
                          <td>{device.type}</td>
                          <td>{device.name}</td>
                          <td>{device.number}</td>
                          <td>{device.user}</td>
                          <td>{device.addTime}</td>
                          <td>
                            <button 
                            className="delete-btn" 
                            title="Удалить" 
                            onClick={() => removeDevice(device._id)}>
                            <i className="bi bi-trash3"></i>
                            </button>
                          </td>
                          <td>
                            <button 
                            className="update-btn" 
                            title="Обновить" 
                            onClick={() => handleUpdateDeviceInfo(device._id)}>
                            <i className="bi bi-arrow-repeat"></i>
                            </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
       <Pagination
        devicesPerPage={devicesPerPage}
        totalDevices={devices.length}
        paginate={pageNumberHandler}
        currentPage={currentPage}
      />
      </div>
      <div className="add-device-block">
        <AddDevice create={createDevice}/>
      </div>
    </div>
  );
};

export default Devices;
