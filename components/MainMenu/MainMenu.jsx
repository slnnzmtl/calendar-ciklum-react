import "./MainMenu.scss";
import React, { useState, useEffect, Fragment } from "react";
import Store from "../../utils/store";
import { publish } from "../../utils/eventBus";
import { useCurrentUser } from "../../utils/CurrentUserContext.jsx";

export default function MainMenu({users}) {

  const { currentUser } = useCurrentUser();

  const title = "Meeting room #1";

  const filterChange = (evt) => {    
    publish('participantFilterChanged', JSON.parse(evt.target.value));
  };  

  const showModal = () => {
    window.location.hash = "create";
  };
  
  const logout = () => {
    Store.clearCurrentUser();
    publish('logout');
  };

  const login = () => {
    window.location.hash = "auth";
  };
  
  return (
    <div className="main-menu">
      <h1 className="main-menu__header">{title}</h1>
      <div className="main-menu__options">
        <select 
          data="participants"
          className="main-menu__filter"    
          onChange={filterChange}
        >
          <option value="{}">Select Participant</option>
          { 
            currentUser && Array.isArray(users) &&
            users.map(({id, data}, key) => 
              <option 
                key={id} 
                value={JSON.stringify({id, data})}
              >
                {data.name}
              </option>
            )
          }
        </select>
        { 
          Store.isAdmin && <button onClick={showModal} className="main-menu__button">+</button>
        }
        {
          currentUser ? 
          <span onClick={logout} className="main-menu__logout">Logout</span> :
          <span onClick={login} className="main-menu__logout">Login</span>
        }
      </div>
    </div>
  )
}