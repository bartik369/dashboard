import React from 'react';

const ChatMenu = ({dropMenu, deleteChat}) => {

  return (
    <div className={dropMenu ? "active" : "menu__items"}>
        <div onClick={() => deleteChat()} className="menu__item">
                <i className="bi bi-trash3"></i>
                <span>Удалить</span>
        </div>
    </div>
  )
}

export default ChatMenu