import "./MainMenu.scss";
import React, { useState, useEffect, Fragment } from "react";
import Store from "../../utils/store";
import { publish } from "../../utils/eventBus";

export default function MainMenu(props) {

  const title = "Meeting room #1";
  // const [users, setUsers] = useState();
  const [ready, setReady] = useState(false);

  Store.getUsers()
  .then(() => {
    setReady(true);
  })

  let filterChange = (evt) => {    
    publish('participantFilterChanged', evt.target.value);
  };

  return (
    <Fragment>
      {
        ready &&
        <div className="main-menu">
          <h1 className="main-menu__header">{title}</h1>
          <div className="main-menu__options">
            <select 
              data="participants"
              className="main-menu__filter"    
              onChange={filterChange}
            >
              <option value="">Select Participant</option>
              { 
                Store.users.map((item, key) => 
                  <option key={key} value={item.data.name}>{item.data.name}</option>
                )
              }
            </select>
            { 
              Store.isAdmin && <button onClick={showModal} className="main-menu__button">+</button>
            }
            <span onClick={logout} className="main-menu__logout">Logout</span>
          </div>
        </div>
      }
    </Fragment>
  )
}

function showModal() {
  console.log(window.location)
  window.location.hash = "create"
}

function logout() {
  Store.clearCurrentUser();
  publish('logout');
}