import React, { useState, useEffect } from 'react';
import './Chat.css';
import axios from 'axios';
import { user$ } from '../Store';
import moment from 'moment';

function Chat(props) {
  const [message, setMessage] = useState("");
  const [send, setSend] = useState(false);
  const [currentMessages, setCurrentMessages] = useState([]);
  const chatInput = React.createRef();
  const messageContainer = React.useRef();

  function updateMessages(newMsg) {
    let arr = [...currentMessages];
    arr.push(newMsg);
    setCurrentMessages(arr);
    messageContainer.current.scrollTo(0, messageContainer.current.scrollHeight);
  }

  props.socket.removeListener('chat');
  props.socket.on('chat', data => {
    updateMessages(data);
  })

  useEffect(() => {
    setCurrentMessages(props.messages);
  }, [props.messages])

  function onChange (e) {
    setMessage(e.target.value);
    e.nativeEvent.target.value ? setSend(true) : setSend(false);
  }

  function sendMessage (e) {
    e.preventDefault();
    chatInput.current.focus();
    if (props.currentRoom.id === 0) return;
    axios.post(`/messages/${props.currentRoom.id}`, { user: user$.value, message })
      .then(res => {
        chatInput.current.value = "";
        setSend(false);
        setMessage("");
        props.socket.emit('chat', {room: props.currentRoom.name, timestamp: new Date(), user: user$.value, message}, function (response) {
          updateMessages(response);
          // update users from here maybe?
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  function deleteChannel () {
    axios.delete(`/channels/${props.currentRoom.id}`)
      .then(res => {
        props.reset();
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <div className="chat">
      <h2 className="chat__heading">Chat {props.currentRoom.name}</h2>
      {
        props.currentRoom.name ?
          <div className="chat__delete" onClick={deleteChannel}>Delete channel</div> : null
      }
      <div ref={messageContainer} className="chat__message-container">
        {
          currentMessages.length ?
            currentMessages.map(msg => {
              return (
                <span key={msg.id} className="chat__message">{moment(msg.timestamp).format('h:mm A')} <b>{msg.user}</b> {msg.message}</span>
              )
            }) : <div>...be the first one to say something!</div>
        }
      </div>
      <form action="" onSubmit={sendMessage}>
        <input className="chat__input" id="message" ref={chatInput} onChange={onChange} type="text"/>
        {
          send ? <button type="submit" className="chat__send">Send</button> : <button type="submit" className="chat__send chat__send--hidden">Send</button>
        }
      </form>
    </div>
  );
}

export default Chat;
