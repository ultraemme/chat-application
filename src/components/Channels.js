import React, { useState, useEffect } from 'react';
import './Channels.css'
import Modal from './Modal';
import axios from 'axios';

function Channels(props) {
  const [channels, setChannels] = useState([]);
  const [channelModal, setChannelModal] = useState(false);

  useEffect(() => {
    getChannels();
  }, []);

  function createChannel (name) {
    console.log(name);
  }

  function getChannels () {
    axios.get("/channels")
      .then(res => {
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

  function toggleModal (e) {
    if (channelModal) {
      setChannelModal(false);
    } else {
      console.log(e.nativeEvent);
      setChannelModal(true);
    }
  }

  return (
    <div className="channels">
      <h2 className="channels__heading" onClick={getChannels}>Channels</h2>
      <ul className="channels__list">
        <li className="channels__new-channel" onClick={(e) => toggleModal(e)}>New channel</li>
        {
          channels.map(chan => {
            return <li key={chan.id} onClick={() => getMessages(chan)}>{chan.name}</li>
          })
        }
      </ul>
      {
        channelModal ? <Modal toggleModal={toggleModal} createChannel={createChannel} /> : null
      }
    </div>
  );
}

export default Channels;
