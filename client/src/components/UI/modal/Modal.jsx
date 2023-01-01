import React from "react";
import "../modal/modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addModal, updateModal } from "../../../store/actions/modalActions";

const Modal = ({ children, active}) => {

  const [visible, setVisible] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setVisible(active)
  }, [active]);

  const refreshModalState = () => {
    dispatch(addModal(false));
    dispatch(updateModal(false));
  }

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
        <div className="close-modal" onClick={() => refreshModalState()}>
        <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
