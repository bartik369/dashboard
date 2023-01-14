import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../modal/modal.css";

const Modal = ({ children, active, close}) => {

  const [visible, setVisible] = useState();

  useEffect(() => {
    setVisible(active)
  }, [active]);

  const mainModalVisibleClass = ["modal"];

  if (visible) {
    mainModalVisibleClass.push("active");
  } else {
    mainModalVisibleClass.push("modal");
  }

  return (
    <div
      className={[mainModalVisibleClass.join(" ")]}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <div className="close-modal" onClick={() => close()}>
        <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
