import "./MainMenu.scss";
import React, { useState, useEffect } from "react";
import Store from "../../utils/store";
import { publish } from "../../utils/eventBus";

export default function MainMenu(props) {

  const title = "Meeting room #1";
  let { users } = Store;

  let filterChange = (evt) => {    
    publish('participantFilterChanged', evt.target.value);
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
            <option value="">Select Participant</option>
            { 
              users.map((item, key) => 
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
  )
}

function optionsRender(array) {
  return array.map((item, key) => 
    <option key={key} value={item.id}>{item.data.name}</option>
  )
};

function showModal() {
  console.log(window.location)
  window.location.hash = "create"
}

function logout() {
  Store.clearCurrentUser();
  publish('logout');
}