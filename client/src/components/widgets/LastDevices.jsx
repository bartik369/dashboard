import React from "react";
import * as contentConstants from "../../utils/constants/content.constants";
import { useSelector } from "react-redux";
import "../widgets/widgets.css";


const LastDevices = () => {

    const {devices} = useSelector(state => state.devices)
    const arrayDevices = [...devices];
    const reverseArrayDevices = arrayDevices.reverse().slice(0, 6);
    
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
                  {reverseArrayDevices.map((device, index) => (
                      <tr key={index}>
                          <td>{device.type}</td>
                          <td>{device.name}</td>
                          <td>{device.number}</td>
                          <td>{device.user}</td>
                          <td>{device.addTime}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
    )
}

export default LastDevices;