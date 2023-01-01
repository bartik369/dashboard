import React from 'react'

function TodoButton({ action, ...props }) {

  return (
  <button className={props.classNameBtn} onClick={action}>
    <i className={props.classNameIcon} title={props.title}></i>
  </button>
  )
}

export default TodoButton