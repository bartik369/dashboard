
import React from 'react';
import "./buttons.css";

export default function AddButton({action, ...props}) {
  return (
    <button className="add-todo-btn" onClick={action}>
    {props.title}
  </button>
  )
}
