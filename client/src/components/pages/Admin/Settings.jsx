import React, {useEffect, useState} from "react";
import "./admin.css"
import SystemInfo from "./SystemInfo";
import UserInfo from "./UserInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard} from '@fortawesome/free-solid-svg-icons';

const Settings = () => {

    const [activeTab, setActiveTab] = useState(1);

    const setTabHandler = (index) => {
        setActiveTab(index)
    }

    return (
        <div className="block-tabs">
            <div nav="tabs-nav">
                <button className={activeTab === 1 ? "tabs active-tabs" : "tabs"} onClick={() => setTabHandler(1)}>
                    <FontAwesomeIcon className="icon" icon={faAddressCard} />
                    <span>UserInfo</span>
                </button>
                <button className={activeTab === 2 ? "tabs active-tabs" : "tabs"} onClick={() => setTabHandler(2)}>
                    <span>SystemInfo</span>
                </button>
                <button className={activeTab === 3 ? "tabs active-tabs" : "tabs"} onClick={() => setTabHandler(3)}>
                    <span>Tab number 3</span>
                </button>
            </div>
            <div className="content-tabs">
                <div className={activeTab === 1 ? "content active-content" : "content"}>
                    <UserInfo />
                </div>
                <div className={activeTab === 2 ? "content active-content" : "content"}>
                    <SystemInfo />
                </div>
                <div className={activeTab === 3 ? "content active-content" : "content"}>
                    Content number3
                </div>
            </div>
        </div>
    )
}

export default Settings;