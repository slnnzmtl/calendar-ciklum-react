import React, { useEffect, useState } from "react";
import {Admin, User} from "../../utils/roles";
import Store from "../../utils/store";
import { publish } from "../../utils/eventBus";

export default function AuthForm({users, returnUser}) {

  const [choosedUser, chooseUser] = useState();

  useEffect(() => {
    if (Array.isArray(users)) {
      chooseUser(users[0]);
    }
  }, [users]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    Store.setCurrentUser (
      choosedUser.data.isAdmin === "true" ? 
      new Admin(choosedUser) : 
      new User(choosedUser)
    )
    .then(res => {
      publish("login");
    });
  }

  return (
    <form   
      className="auth" 
      onSubmit={handleSubmit} 
    >
        <span className="auth__title">
            Please authorise
        </span>
        <select 
          className="auth__select" 
          name="participants"
          onChange={
            e => chooseUser(
              JSON.parse(e.target.value)
            )
          }
        >
          {
            Array.isArray(users) && users.map((item, index) => 
            
              <option 
                className="auth__select-option"
                key={index}
                value={
                  JSON.stringify(item)
                }
              >
                {item.data.name}
              </option>
            )
          }
        </select>
        <button 
          className="auth__button"
        >
          Confirm
        </button>
    </form>
  )
}
