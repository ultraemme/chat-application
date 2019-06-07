import React, { useState} from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { updateUser } from '../Store'

function Login() {
  const [loginDetails, setLoginDetails] = useState({username: "", password: ""});
  const [status, setStatus] = useState(0);
  const [login, setLogin] = useState(false);

  function handleChange (e) {
    if (e.nativeEvent.target.id === "username" && !e.nativeEvent.target.value) {
      setStatus(0);
    }
    setLoginDetails({...loginDetails, [e.nativeEvent.target.id]: e.nativeEvent.target.value});
  }

  function validateChange (e) {
    if (e.nativeEvent.target.value) {
      axios.get(`/validate/${loginDetails.username}`)
        .then(res => {
          res.data === "user exists" ? setStatus(2) : setStatus(1);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  function requestLogin (e) {
    e.preventDefault();
    if (loginDetails.username && loginDetails.password) {
      axios.post("/login", {username: loginDetails.username, password: loginDetails.password})
        .then(res => {
          if (res.status === 200) {
            updateUser(loginDetails.username);
            setLogin(true);
          }
        })
        .catch(err => {
          setStatus(-1);
        })
    } else {
      console.log("Invalid input")
    }
  }

  return (
    login ? <Redirect to="/lobby"/> :
    (
    <main className="login">
      <form className="login__form" action="" onSubmit={requestLogin}>
        <label className="login__label" htmlFor="">USERNAME</label><br/>
        {
          status === 0 ? <input className="login__input" id="username" type="text" onChange={handleChange} onBlur={validateChange}/> :
          status === 1 ? <input className="login__input login__input--valid" id="username" type="text" onChange={handleChange} onBlur={validateChange}/> :
          status === 2 ? <input className="login__input login__input--exists" id="username" type="text" onChange={handleChange} onBlur={validateChange}/> :
          <input className="login__input login__input--invalid" id="username" type="text" onChange={handleChange} onBlur={validateChange}/>

        }
        <label className="login__label" htmlFor="">PASSWORD</label><br/>
        {
          status === -1 ? <input className="login__input login__input--invalid" id="password" type="password" onChange={handleChange}/> :
          <input className="login__input" id="password" type="password" onChange={handleChange}/>
        }
        <button type="submit" className="login__submit">SIGN IN</button>
      </form>
    </main>
    )
  );
}

export default Login;
