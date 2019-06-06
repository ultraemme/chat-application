import React, { useState } from 'react';
import './Channels.css'
import axios from 'axios';

function Channels(props) {
  const [channels, setChannels] = useState([]);

  function getChannels () {
    axios.get("/channels")
      .then(res => {
        console.log(res.data);
        setChannels(res.data.logs);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function getMessages (chan) {
    props.socket.emit('chat', { //emit event to lobby.js
      message: chan.name
    })
  }

  return (
    <div className="channels">
      <p onClick={getChannels}>Channels</p>
      <ul>
        {
          channels.map(chan => {
            return <li key={chan.id} onClick={() => getMessages(chan)}>{chan.name}</li>
          })
        }
      </ul>
    </div>
  );
}

export default Channels;
