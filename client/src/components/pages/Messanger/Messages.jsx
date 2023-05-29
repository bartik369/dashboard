import React from 'react'

function Messages() {

  const someHandler = (e) => {
    e.preventDefault()
    console.log(e.targe)
  }
  return (
    <div>
      <div className="messages__items">
        список сообщений
      </div>
      <div className="messages__input">
        <textarea onClick={(e) => someHandler(e)}/>
        <button className="send-btn">Send</button>
      </div>
        
    </div>
  )
}

export default Messages