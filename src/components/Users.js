import React, { useState } from 'react';
import './Users.css';
import io from 'socket.io-client'

function Users(props) {
  const [users, setUsers] = useState([]);

  props.socket.on('user-connect', (data) => {
    let u = [...users];
    if (!u.includes(data.user)) {
      u.push(data.user);
      setUsers(u);
    }
  });

  return (
    <div className="users">
      <h2 className="users__heading">Active users</h2>
      <ul className="users__list">
        {
          users.map(user => {
            return <li key={user}>{user}</li>
          })
        }
      </ul>
    </div>
  );
}

export default Users;
