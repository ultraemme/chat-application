import React, { useState } from 'react';
import './Chat.css';

function Chat() {
  const [message, setMessage] = useState("");
  const [send, setSend] = useState(false);

  function handleChange (e) {
    e.nativeEvent.target.value ? setSend(true) : setSend(false);
    setMessage(e.target.value);
  }

  function sendMessage (e) {
    e.preventDefault();
    console.log(message);
  }

  return (
    <div className="chat">
      <h2 className="chat__heading">Chat</h2>
      <div className="chat__message-container">
        <span className="chat__welcome-msg">Joined <b>room-name</b></span><br/>
        <span>12.00PM <b>Emil</b> Message</span>
      </div>
      <form action="" onSubmit={sendMessage}>
        <input onChange={(e) => handleChange(e)} id="message" className="chat__input" type="text"/>
        {
          send ? <button type="submit" className="chat__send">Send</button> : <button type="submit" className="chat__send chat__send--hidden">Send</button>
        }
      </form>
    </div>
  );
}

export default Chat;
