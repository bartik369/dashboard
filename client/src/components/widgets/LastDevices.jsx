import React from "react";
import * as contentConstants from "../../utils/constants/content.constants";
import { useGetBasicDevicesQuery } from "../../store/features/devices/deviceApi";
import "../widgets/widgets.css";


const LastDevices = () => {
    const { data, isLoading } = useGetBasicDevicesQuery()
    return (
        <div className="widget-item">
          <div className="wrapper-title">
          <div className="icon-title"><i className="bi bi-collection"></i></div>
          <div className="widget-item__title">{contentConstants.lastDevicesTitle}</div>
          </div>
          <table className="widget-table">
              <thead>
                  <tr>
                      <th>{contentConstants.deviceType}</th>
                      <th>{contentConstants.deviceName}</th>
                      <th>{contentConstants.deviceNumber}</th>
                      <th>{contentConstants.deviceUser}</th>
                      <th>{contentConstants.deviceDateAdded}</th>
                  </tr>
              </thead>
              <tbody>
                  {data && data.map((device, index) => (
                      <tr key={index}>
                          <td>{device.type}</td>
                          <td>{device.name}</td>
                          <td>{device.number}</td>
                          <td>{device.user}</td>
                          <td>{device.addTime}</td>
                      </tr>
                  )).reverse().slice(0, 6)}
              </tbody>
          </table>
        </div>
    )
}

export default LastDevices;