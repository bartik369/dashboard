import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import Modal from "../../UI/modal/Modal";
import UpdateDeviceForm from "../../form/update-device/UpdateDeviceForm";
import AddDevice from "../../form/add-device/AddDevice";
import CategoryMenu from "./CategoryMenu";
import {
  useGetDeviceQuery,
  useGetDevicesQuery,
  useDeleteDeviceMutation,
  useAddDeviceMutation,
} from "../../../store/features/devices/deviceApi";
import * as contentConstants from "../../../utils/constants/content.constants"
import "../../../styles/App.css";
import "./devices.css";

const Devices = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [singleDevice, setSingleDevice] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("")
  const [totalPage, setTotalPage] = useState(0)
  const urlParams = `/api/devices?page=${page}&search=${search}`
  // const { data: device } = useGetDeviceQuery(singleDevice);
  const { data, isFetching, isLoading } = useGetDevicesQuery(urlParams);
  const [deleteDevice] = useDeleteDeviceMutation();
  const [addDevice] = useAddDeviceMutation();


  useEffect(() => {
    if (data) {
      setTotalPage(data.pageCount)
    }
  }, [data])

  const createDevice = (newDevice) => {
    // dispatch(addDevice(newDevice));
    addDevice(newDevice);
  };

  // Delete device

  // function removeDevice(id) {
  //   dispatch(deleteDevice(id));
  // }

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
    setSearch(category)
  };

  const resetHandler = () => {
    // setCategory(devices.devices);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const pageNumberHandler = (e) => {
    setPage(e.selected + 1)
  }

  return (
    <div className="content-container__inner">
      <div className="devices-category">
        <CategoryMenu sortCategory={sortCategoryHandler} reset={resetHandler} />
      </div>
      <Modal active={activeModal} close={closeModal}>
        {/* <UpdateDeviceForm update={updateDeviceData} device={device} /> */}
      </Modal>
      <div className="devices-list">
        <div className="title">Список устройств</div>
       <form onSubmit={handleSearch}>
       <input type="text" onChange={(e) => handleSearch(e)}/>
       </form>
        {!isFetching &&
          data.data.map((device, index) => (
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
                  // onClick={() => handleUpdateDeviceInfo(device._id)}
                >
                  <i className="bi bi-arrow-repeat"></i>
                  <span>Обновить</span>
                </button>
              </div>
            </div>
          ))}
      <div className="pages">
      <ReactPaginate
        breakLabel={contentConstants.breakLabel}
        nextLabel={contentConstants.next}
        onPageChange={(e) => pageNumberHandler(e)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={15}
        pageCount={totalPage}
        previousLabel={contentConstants.prev}
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      </div>
      </div>
      <div className="add-device-block">
        <AddDevice create={createDevice} />
      </div>
    </div>
  );
};

export default Devices;