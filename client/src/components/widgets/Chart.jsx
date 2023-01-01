import React, {useEffect} from "react";
import { loadDevices } from "../../store/actions/devicesActions";
import { useDispatch, useSelector } from "react-redux";
import "../widgets/widgets.css";
import CanvasJSReact from "../../lib/canvas/canvasjs.react"
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = () => {

    useEffect(() => {
        dispatch(loadDevices());
    }, [])


    let dispatch = useDispatch();
    const {devices} = useSelector(state => state.devices)
    const nameArray = [];
    let newArray = []
    let count = []

    const getDevicesCount = () => {
        devices.map((item) => {
            nameArray.push(item.type);
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
        animationEnabled: true,
        theme: "light2",
        axisX: {
            titleFontColor: "#555a6b",
			lineColor: "#6D78AD",
			labelFontColor: "#555a6b",
            title: "Категории",
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
                type: "bar",
                indexLabelLineThickness: 1,
                dataPoints:[...newArray]
            }
        ]
    };

    return (
        <div className="widget-item">
          <div className="wrapper-title">
          <div className="icon-title"><i className="bi bi-list-columns"></i></div>
          <div className="widget-item__title">Статиcтика по оборудованию</div>
          </div>
            <CanvasJSChart options = {options} />
        </div>
    )
}

export default Chart;


