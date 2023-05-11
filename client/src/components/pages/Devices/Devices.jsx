import React, { useEffect, useState } from "react";
import Modal from "../../UI/modal/Modal";
import UpdateDeviceForm from "../../form/update-device/UpdateDeviceForm";
import AddDevice from "../../form/add-device/AddDevice";
import Pagination from "../../UI/pagination/Pagination";
import CategoryMenu from "./CategoryMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetDeviceQuery,
  useGetDevicesQuery,
  useDeleteDeviceMutation,
  useAddDeviceMutation,
} from "../../../store/features/devices/deviceApi";
import "../../../styles/App.css";
import "./devices.css";
import { faChessKnight } from "@fortawesome/free-solid-svg-icons";

const Devices = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [singleDevice, setSingleDevice] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({sort: "searchData", order: "desc"})
  const [search, setSearch] = useState()
  let dispatch = useDispatch();
  // const [getDevice] = useGetDeviceQuery();
  // const searchQuery = useSelector(state => state.seqrchQuery.query);
  const searchQuery = "";
  const [category, setCategory] = useState([]);
  let filter = [];
  const { data: device } = useGetDeviceQuery(singleDevice);
  const { data, isLoading, isFetching } = useGetDevicesQuery(page, sort, search);
  const [deleteDevice] = useDeleteDeviceMutation();
  const [addDevice] = useAddDeviceMutation();

  const [currentPage, setCurrentPage] = useState(1);

  console.log(data)
  // const [devicesPerPage] = useState(25);

  // const indexOfLastDevice = currentPage * devicesPerPage;
  // const indefOfFirstDevice = indexOfLastDevice - devicesPerPage;

  // useEffect(() => {
    // filter = devices.filter((item) => {
    //   return Object.keys(item).some((request) =>
    //     String(item[request]).toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    // })
    // setCategory(filter)
  // }, [devices, searchQuery, indefOfFirstDevice, indexOfLastDevice]);

  // Search device

  // const pageNumberHandler = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // }

  const createDevice = (newDevice) => {
    // dispatch(addDevice(newDevice));
    addDevice(newDevice);
  };

  // Delete device

  function removeDevice(id) {
    dispatch(deleteDevice(id));
  }

  // Update device

  const handleUpdateDeviceInfo = (id) => {
    setActiveModal(true);
    setSingleDevice(id);
    // dispatch(geteDevice(id));
  };

  const updateDeviceData = (updateData) => {
    // dispatch(updateDevice(updateData, updateData.id));
    setActiveModal(false);
  };

  // Create device

  const sortCategoryHandler = (category) => {
    const sortedCategoryArray = data.devices.filter((item) => {
      if (item.type === category) {
        return item.type;
      }
    });
    // }).slice(indefOfFirstDevice, indexOfLastDevice);
    setCategory(sortedCategoryArray);
  };

  const resetHandler = () => {
    setCategory(data.devices);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="content-container__inner">
      <div className="devices-category">
        <CategoryMenu sortCategory={sortCategoryHandler} reset={resetHandler} />
      </div>
      <Modal active={activeModal} close={closeModal}>
        <UpdateDeviceForm update={updateDeviceData} device={device} />
      </Modal>
      <div className="devices-list">
        <div className="title">Список устройств</div>
        {!isFetching &&
          data.devices.map((device, index) => (
            <div className="device" key={index}>
              <span>{device.type}</span>
              <span>{device.name}</span>
              <span>{device.number}</span>
              <span>{device.user}</span>
              <span>{device.addTime}</span>
              <div className="device-btns">
                <button
                  className="delete-btn"
                  title="Удалить"
                  onClick={() => deleteDevice(device._id)}
                >
                  <i className="bi bi-trash3"></i>
                  <span>Удалить</span>
                </button>
                <div className="line"></div>
                <button
                  className="update-btn"
                  title="Обновить"
                  // onClick={() => handleUpdateDeviceInfo(device._id)}>
                  onClick={() => handleUpdateDeviceInfo(device._id)}
                >
                  <i className="bi bi-arrow-repeat"></i>
                  <span>Обновить</span>
                </button>
              </div>
            </div>
          ))}
        {/* {category.slice(indefOfFirstDevice, indexOfLastDevice).map((device, index) => (
                      <div className="device" key={index}>
                          <span>{device.type}</span>
                          <span>{device.name}</span>
                          <span>{device.number}</span>
                          <span>{device.user}</span>
                          <span>{device.addTime}</span>
                          <div className="device-btns">
                            <button 
                            className="delete-btn" 
                            title="Удалить" 
                            onClick={() => deleteDevice(device._id)}>
                            <i className="bi bi-trash3"></i>
                            <span>Удалить</span>
                            </button>
                            <div className="line"></div>
                            <button 
                            className="update-btn" 
                            title="Обновить" 
                            // onClick={() => handleUpdateDeviceInfo(device._id)}>
                            onClick={() => handleUpdateDeviceInfo(device._id)}>
                            <i className="bi bi-arrow-repeat"></i>
                            <span>Обновить</span>
                            </button>
                          </div>
                      </div>
                  ))} */}
        {/* <Pagination
        devicesPerPage={devicesPerPage}
        totalDevices={category.length}
        paginate={pageNumberHandler}
        currentPage={currentPage}
      /> */}
        <button onClick={() => setPage(page - 1)} isLoading={isFetching}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)} isLoading={isFetching}>
          Next
        </button>
      </div>
      <div className="add-device-block">
        <AddDevice create={createDevice} />
      </div>
    </div>
  );
};

export default Devices;
