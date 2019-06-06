import React from 'react';
import Channels from './Channels';
import Users from './Users';
import Chat from './Chat';
import './Lobby.css';
import io from 'socket.io-client';

function Lobby() {
  const socket = io.connect('http://localhost:8000');

  socket.on('chat', (data) => {
    console.log(data.message + " from lobby.js");
  })

  return (
    <div className="lobby">
      <Channels socket={socket}/>
      <Chat/>
      <Users/>
    </div>
  );
}

export default Lobby;
