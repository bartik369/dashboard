import React, {useState, useEffect} from "react";
import "../modal/modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { spareModal } from "../../../store/actions/modalActions";

const ModalSpare = ({ children, active}) => {

  const [visible, setVisible] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setVisible(active)
  }, [active]);

  const refreshModalState = () => {
    dispatch(spareModal(false));
  }

  const mainModalVisibleClass = ["modal2"];

  if (visible) {
    mainModalVisibleClass.push("active");
  } else {
    mainModalVisibleClass.push("modal2");
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

export default ModalSpare;
