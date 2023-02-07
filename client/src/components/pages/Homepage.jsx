import React, { useState } from "react";
import Chart from "../widgets/Chart";
import LastDevices from "../widgets/LastDevices";
import OverdueTodo from "../widgets/OverdueTodo";
import "../../styles/App.css"
import DeviceHistory from "../widgets/DeviceHistory";
import LastUsers from "../widgets/LastUsers";


const Homepage = () => {

  return (
    <div>
      <div className="wrapper">
        <div className="row">
        <div className="col-m"><LastDevices /></div>
        <div className="col-s"><OverdueTodo /></div>
        <div className="col-s"></div>
        <div className="col-s"></div>
        </div>
        <div className="row">
          <div className="col-m"><Chart /></div>
          <div className="col-m"><DeviceHistory /></div>
          <div className="col-m"></div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;