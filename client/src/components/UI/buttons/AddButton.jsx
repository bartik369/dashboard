import React from "react";
import "./buttons.css";

export default function AddButton({ action, ...props }) {

  return (
    <button className={props.className} onClick={action}>
      <i class={props.icon}></i>
      {props.title}
    </button>
  );
}
