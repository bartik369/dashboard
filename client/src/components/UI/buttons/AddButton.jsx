import React from "react";
import "./buttons.css";

export default function AddButton({ action, ...props }) {

  return (
    <button className={props.className} onClick={action}>
      <i className={props.icon}></i>
      {props.title}
    </button>
  );
}
