import React from "react";
import { useSelector } from "react-redux";
import * as uiConstants from "../../utils/constants/ui.constants";
import { useGetBasicDevicesQuery } from "../../store/features/devices/deviceApi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "../widgets/widgets.css";

const DeviceHistory = () => {
    const {data, isLoading} = useGetBasicDevicesQuery()
    // const {devices} = useSelector(state => state.devices)
    const nameArray = [];
    let historyArray = [];
    let count = [];

    if (data) {

            data.map((item) => {
                nameArray.push(item.addTime.split(' ')[0]);
            });
            nameArray.map((sum) => {
                count[sum] = (count[sum] || 0) + 1
            });
            Object.keys(count).map(function(x) {
              historyArray.push({count: count[x], label: x})
            })
        
    
    }

    console.log(historyArray)

    return (
        <div className="widget-item">
             <div className="wrapper-title">
             <div className="icon-title"><i className="bi bi-graph-up"></i></div>
             <div className="widget-item__title">{uiConstants.titleMoveChart}</div>
             </div>
             <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            width={400}
            height={260}
            data={historyArray}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis dataKey="count" />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
        </div>
    )
}

export default DeviceHistory;