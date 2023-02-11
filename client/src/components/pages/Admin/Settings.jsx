import React, { useEffect, useState } from "react";
import "./admin.css";
import SystemInfo from "./SystemInfo";
import UserInfo from "./UserInfo";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(1);

  const setTabHandler = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="block-tabs">
      <div nav="tabs-nav">
        <button
          className={activeTab === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => setTabHandler(1)}>
          <i className="bi bi-person-video3"></i>
          <span>Пользователи</span>
        </button>
        <button
          className={activeTab === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => setTabHandler(2)}
        >
          <i className="bi bi-filetype-exe"></i>
          <span>Выгрузка</span>
        </button>
        <button
          className={activeTab === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => setTabHandler(3)}
        >
          <i className="bi bi-activity"></i>
          <span>Мониторинг</span>
        </button>
        <button
          className={activeTab === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => setTabHandler(4)}
        >
          <i className="bi bi-hdd-rack"></i>
          <span>Система</span>
        </button>
        <button
          className={activeTab === 5 ? "tabs active-tabs" : "tabs"}
          onClick={() => setTabHandler(5)}
        >
          <i className="bi bi-shield-check"></i>
          <span>Защита</span>
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
          Content number 3
        </div>
        <div className={activeTab === 4 ? "content active-content" : "content"}>
          Content number 4
        </div>
        <div className={activeTab === 5 ? "content active-content" : "content"}>
          Content number 5
        </div>
      </div>
    </div>
  );
};

export default Settings;
