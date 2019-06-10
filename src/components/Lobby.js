import React, { useState, useEffect } from 'react';
import Channels from './Channels';
import Users from './Users';
import Chat from './Chat';
import './Lobby.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000');
let oldRoom = {name: ""};

function Lobby() {
  const [currentRoom, setCurrentRoom] = useState({id: 0, name: "", users: []});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (oldRoom.name !== currentRoom.name) {
      socket.emit('leave', oldRoom.name);
      oldRoom.name = currentRoom.name;
    }
  })

  function setMsgs (arr) {
    setMessages(arr);
  }

  function reset () {
    setCurrentRoom({id: 0, name: "", users: []});
    setMessages([])
  }

  function setRoom(id, name, users) {
    setCurrentRoom({id, name, users});
  }

  return (
    <div className="lobby">
      <Channels setMessages={setMsgs} setRoom={setRoom} socket={socket}/>
      <Chat reset={reset} setRoom={setRoom} messages={messages} currentRoom={currentRoom} socket={socket}/>
      <Users currentRoom={currentRoom} socket={socket}/>
    </div>
  );
}

export default Lobby;
