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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("")
  const [totalPage, setTotalPage] = useState(0)
  const urlParams = `/api/devices?page=${page}&search=${search}`
  // const { data: device } = useGetDeviceQuery(singleDevice);
  const { data, isFetching, isLoading } = useGetDevicesQuery(urlParams);
  const [deleteDevice] = useDeleteDeviceMutation();
  const [addDevice] = useAddDeviceMutation();

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
    // const sortedCategoryArray = devices.devices.filter((item) => {
    //   if (item.type === category) {
    //     return item.type;
    //   }
    // });
    // // }).slice(indefOfFirstDevice, indexOfLastDevice);
    // setCategory(sortedCategoryArray);
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


  useEffect(() => {
    if (data) {
      setTotalPage(data.pageCount)
    }
  }, [data])

  console.log(page)
  console.log(totalPage)

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
        currentPage={page}
        paginate={pageNumberHandler}
      /> */}
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

{/* <ReactPaginate
        nextLabel="next >"
        onPageChange={(e) => pageNumberHandler(e)}
        pageRangeDisplayed={14}
        marginPagesDisplayed={2}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />     */}
      </div>
        {/* <button onClick={() => setPage(page - 1)} isLoading={isFetching}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)} isLoading={isFetching}>
          Next
        </button> */}
      </div>
      <div className="add-device-block">
        <AddDevice create={createDevice} />
      </div>
    </div>
  );
};

export default Devices;



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