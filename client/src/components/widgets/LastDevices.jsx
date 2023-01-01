import React from "react";
import "../widgets/widgets.css";
import { useSelector } from "react-redux";


const LastDevices = () => {

    const {devices} = useSelector(state => state.devices)
    const arrayDevices = [...devices];
    const reverseArrayDevices = arrayDevices.reverse().slice(0, 6);
    
    return (
        <div className="widget-item">
          <div className="wrapper-title">
          <div className="icon-title"><i className="bi bi-collection"></i></div>
          <div className="widget-item__title">Последние выданные</div>
          </div>
          <table className="widget-table">
              <thead>
                  <tr>
                      <th>Тип</th>
                      <th>Модель устройства</th>
                      <th>Номер</th>
                      <th>Пользователь</th>
                      <th>Дата</th>
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