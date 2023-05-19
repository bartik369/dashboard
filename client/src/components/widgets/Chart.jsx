import React, {useEffect} from "react";
import { useDispatch} from "react-redux";
import * as uiConstants from "../../utils/constants/ui.constants";
import { useGetBasicDevicesQuery } from "../../store/features/devices/deviceApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import "../widgets/widgets.css";

const Chart = () => {
    const {data: devices, isLoading} = useGetBasicDevicesQuery()
    // const {devices} = useSelector(state => state.devices)
    const nameArray = [];
    let dispatch = useDispatch();
    let newArray = [];
    let count = [];

    console.log(devices)

    const getDevicesCount = () => {
        devices.map((item) => {
            nameArray.push(item.type);
        });
        nameArray.map((sum) => {
            count[sum] = (count[sum] || 0) + 1
        });
        Object.keys(count).map(function(x) {
            newArray.push({count: count[x], name: x})
        })
    }

    if (devices) {
      getDevicesCount()
    }

    console.log(newArray)

    return (
        <div className="widget-item">
          <div className="wrapper-title">
          <div className="icon-title"><i className="bi bi-list-columns"></i></div>
          <div className="widget-item__title">{uiConstants.titleDeviceChart}</div>
          </div>
            {
              <ResponsiveContainer width="100%" height={260}>
              <AreaChart
                width={400}
                height={260}
                data={newArray}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#848fd8" fill="#848fd8" />
              </AreaChart>
            </ResponsiveContainer>
            }
        </div>
    )
}

export default Chart;


