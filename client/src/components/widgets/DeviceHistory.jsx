import React from "react";
import "../widgets/widgets.css";
import CanvasJSReact from "../../lib/canvas/canvasjs.react";
import { useSelector } from "react-redux";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DeviceHistory = () => {
    const {devices} = useSelector(state => state.devices)
    const nameArray = [];
    let newArray = []
    let count = []

    const getDevicesCount = () => {
        devices.map((item) => {
            nameArray.push(item.addTime.split(' ')[0]);
        });
        nameArray.map((sum) => {
            count[sum] = (count[sum] || 0) + 1
        });
        Object.keys(count).map(function(x) {
            newArray.push({y: count[x], label: x})
        })
    }
    getDevicesCount()

    const options = {
        theme: "light2",
		animationEnabled: true,
		exportEnabled: true,
        axisX: {
            titleFontColor: "#555a6b",
			lineColor: "#6D78AD",
			labelFontColor: "#4c926b",
            title: "Дата выдачи",
            fontFamily: "calibri",
            titleFontSize: 15,
        },
        axisY: {
            titleFontColor: "#555a6b",
			lineColor: "#6D78AD",
			labelFontColor: "#555a6b",
            title: "Количество",
            fontFamily: "calibri",
            titleFontSize: 15,
        },
        data: [
            {
                type: "area",
				xValueFormatString: "DD/MM/YYYY",
                dataPoints:[...newArray]
            }
        ]
    }

    return (
        <div className="widget-item">
             <div className="wrapper-title">
             <div className="icon-title"><i className="bi bi-graph-up"></i></div>
             <div className="widget-item__title">Статиcтика выданного оборудования</div>
             </div>
            <CanvasJSChart options = {options} />
        </div>
    )
}


export default DeviceHistory;