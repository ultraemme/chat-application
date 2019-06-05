import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';

function Login() {
  const [loginDetails, setLoginDetails] = useState({username: "", password: ""});
  const [status, setStatus] = useState(0);

  function handleChange (e) {
    setLoginDetails({...loginDetails, [e.nativeEvent.target.id]: e.nativeEvent.target.value});
  }

  function validateChange (e) {
    if (e.nativeEvent.target.value) {
      axios.get(`/validate/${loginDetails.username}`)
        .then(res => {
          setStatus(1);
        })
        .catch(err => {
          setStatus(-1);
        })
    }
  }

  function requestLogin (e) {
    e.preventDefault();
    if (status === 1 && loginDetails.password) {
      //send login details to API
      axios.get(`/login/${loginDetails.username}/${loginDetails.password}`)
        .then(res => {
          console.log(res);
        })
    } else {
      //if username is taken or password input is invalid
      console.log("invalid username or password")
    }
  }

  return (
    <main className="login">
      <form className="login__form" action="" onSubmit={requestLogin}>
        <label className="login__label" htmlFor="">USERNAME</label><br/>
        {
          status === 0 ? <input className="login__input" id="username" type="text" onChange={handleChange} onBlur={validateChange}/> :
          status === 1 ? <input className="login__input login__input--valid" id="username" type="text" onChange={handleChange} onBlur={validateChange}/> :
          <input className="login__input login__input--invalid" id="username" type="text" onChange={handleChange} onBlur={validateChange}/>
        }
        <label className="login__label" htmlFor="">PASSWORD</label><br/>
        <input className="login__input" id="password" type="password" onChange={handleChange}/>
        <button type="submit" className="login__submit">SIGN IN</button>
      </form>
    </main>
  );
}

export default Login;
