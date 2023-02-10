import React, {useEffect, useState} from "react";
import "./admin.css"

const Settings = () => {

    const [activeTab, setActiveTab] = useState(1);

    const setTabHandler = (index) => {
        setActiveTab(index)
    }

    return (
        <div className="tabs">
            <div nav="tabs-nav">
                <button className={activeTab === 1 ? "tabs active-tabs" : "tabs"} onClick={() => setTabHandler(1)}>
                    Tab number 1
                </button>
                <button className={activeTab === 2 ? "tabs active-tabs" : "tabs"} onClick={() => setTabHandler(2)}>
                    Tab number 2
                </button>
                <button className={activeTab === 3 ? "tabs active-tabs" : "tabs"} onClick={() => setTabHandler(3)}>
                    Tab number 3
                </button>
            </div>
            <div className="tabs-content">
                <div className={activeTab === 1 ? "content active-content" : "content"}>
                    Content number1
                </div>
                <div className={activeTab === 2 ? "content active-content" : "content"}>
                    Content number2
                </div>
                <div className={activeTab === 3 ? "content active-content" : "content"}>
                    Content number3
                </div>
            </div>
        </div>
    )
}

export default Settings;