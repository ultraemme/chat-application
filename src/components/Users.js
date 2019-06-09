import React from 'react';
import './Users.css';

function Users(props) {
  return (
    <div className="users">
      <h2 className="users__heading">Users</h2>
      <ul className="users__list">
        {
          props.currentRoom.users.map(user => {
            return <li key={user}>{user}</li>
          })
        }
      </ul>
    </div>
  );
}

export default Users;
