import React from 'react';
import "./buttons.css"

function SubmitButton({...props}) {
  return (
    <button className={props.className} type="submit">
      <i class={props.icon}></i>
      {props.title}
    </button>
  )
}

export default SubmitButton;