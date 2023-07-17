import React, {useEffect, useRef} from 'react';

const ConversationMenu = ({dropMenu, deleteChat, setDropMenu}) => {
const menuRef = useRef();

useEffect(() => {
  const outsideClickhandler = (e) => {
     if (!menuRef.current.contains(e.target)) {
       setDropMenu(false)
     }
  }
  document.addEventListener("mousedown", outsideClickhandler)
}, [])

console.log("conversation menu test mem")

  return (
    <div className={dropMenu ? "active" : "menu__items"} ref={menuRef}>
        <div onClick={() => deleteChat()} className="menu__item">
                <i className="bi bi-trash3"></i>
                <span>Скрыть переписку</span>
        </div>
    </div>
  )
}

export default ConversationMenu