import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import Modal from "../../UI/modal/Modal";
import UpdateDeviceForm from "../../form/update-device/UpdateDeviceForm";
import AddDevice from "../../form/add-device/AddDevice";
import CategoryMenu from "./CategoryMenu";
import {
  useGetDeviceMutation,
  useGetDevicesQuery,
  useDeleteDeviceMutation,
  useAddDeviceMutation,
  useUpdateDeviceMutation,
} from "../../../store/features/devices/deviceApi";
import * as contentConstants from "../../../utils/constants/content.constants";
import * as uiConstants from "../../../utils/constants/ui.constants"
import "../../../styles/App.css";
import "./devices.css";

const Devices = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("")
  const [totalPage, setTotalPage] = useState(0)
  const urlParams = `/api/devices?page=${page}&search=${search}`
  const [getDevice, { data: device }] = useGetDeviceMutation();
  const { data: devices, isFetching, isLoading } = useGetDevicesQuery(urlParams);
  const [deleteDevice] = useDeleteDeviceMutation();
  const [addDevice] = useAddDeviceMutation();
  const [updateDevice] = useUpdateDeviceMutation();

  useEffect(() => {
    if (devices) {
      setTotalPage(devices.pageCount)
    }
  }, [devices])

  const createDevice = async (newDevice) => {
    // dispatch(addDevice(newDevice));
    await addDevice(newDevice).unwrap();
  };

  // Delete device

  const removeDevice = async (id) => {
    await deleteDevice(id).unwrap()
  }

  // Update device

  const handleUpdateDeviceInfo = async (id) => {
    setActiveModal(true);
    await getDevice({id: id}).unwrap()
  };

  const updateDeviceInfo = async (updateDeviceData) => {
    await updateDevice(updateDeviceData).unwrap()
    setActiveModal(false);
  }

  // Create device

  const sortCategoryHandler = (category) => {
    setSearch(category)
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
        <CategoryMenu sortCategory={sortCategoryHandler} />
      </div>
      <Modal active={activeModal} close={closeModal}>
        <UpdateDeviceForm update={updateDeviceInfo} device={device} />
      </Modal>
      <div className="devices-list">
      <div className="title">{contentConstants.devicesTitle}</div>
      <div className="devices-list__search">
      <form className="search" onSubmit={handleSearch}>
      <i className="bi bi-search"/>
       <input type="text" onChange={(e) => handleSearch(e)}/>
       </form>
      </div>
        {!isFetching &&
          devices.data.map((device, index) => (
            <div className="device" key={index}>
              <span>{device.type}</span>
              <span>{device.name}</span>
              <span>{device.number}</span>
              <span>{device.user}</span>
              <span>{device.addTime}</span>
              <div className="device-btns">
                <button
                  className="delete-btn"
                  title={uiConstants.del}
                  onClick={() => removeDevice(device._id)}
                >
                  <i className="bi bi-trash3"></i>
                  <span>{uiConstants.del}</span>
                </button>
                <div className="line"></div>
                <button
                  className="update-btn"
                  title={uiConstants.update}
                  onClick={() => handleUpdateDeviceInfo(device._id)}>  
                  <i className="bi bi-arrow-repeat"></i>
                  <span>{uiConstants.update}</span>
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