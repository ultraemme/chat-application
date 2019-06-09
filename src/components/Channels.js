import React, { useState, useEffect } from 'react';
import './Channels.css'
import Modal from './Modal';
import axios from 'axios';

function Channels(props) {
  const [channels, setChannels] = useState([]);
  const [channelModal, setChannelModal] = useState(false);

  useEffect(() => {
    getChannels();
    props.socket.on('channel', (data) => {
      setChannels(data.logs);
    })
  }, []);

  function createChannel(name) {
    axios.post('/channels', { name })
      .then(res => {
        props.socket.emit('channel', (name))
      })
      .catch(err => {
        console.log(err);
      })
  }

  function getChannels() {
    axios.get("/channels")
      .then(res => {
        setChannels(res.data.logs);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function getMessages(chan) {
    axios.get(`/messages/${chan.id}`)
      .then(res => {
        props.socket.emit('join', chan.name);
        props.setRoom(chan.id, chan.name, chan.users);
        props.setMessages(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function toggleModal (e) {
    if (channelModal) {
      setChannelModal(false);
    } else {
      setChannelModal(true);
    }
  }

  return (
    <div className="channels">
      <h2 className="channels__heading">Channels</h2>
      <ul className="channels__list">
        <li className="channels__new-channel" onClick={(e) => toggleModal(e)}>New channel</li>
        {
          channels.map(chan => {
            return <li className="channels__channel" key={chan.id} onClick={() => getMessages(chan)}>{chan.name}</li>
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
