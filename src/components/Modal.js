import React, { useState } from 'react';
import './Modal.css';

function Modal(props) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.nativeEvent.target.value);
  }

  function createChannel(e) {
    e.preventDefault();
    props.createChannel(name);
    props.toggleModal();
  }

  return (
    <div className="modal">
      <h3 className="modal__heading">What do you want to call the channel?</h3>
      <form className="modal__form" action="" onSubmit={(e) => createChannel(e)}>
        <input className="modal__input" onChange={(e) => handleChange(e)} type="text" id="name"/>
        <button className="modal__button-cancel" onClick={props.toggleModal}>Cancel</button>
        <button className="modal__button-create" type="submit">Create channel</button>
      </form>
    </div>
  );
}

export default Modal;
