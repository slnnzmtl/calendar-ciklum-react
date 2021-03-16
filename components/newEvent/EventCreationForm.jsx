import React, { useState } from "react";
import "./EventCreationForm.scss";
import Store from "../../utils/store";
import selectComponent from "../selectComponent/selectComponent.js";

export default function EventCreationForm() {

  const [nameField, setName] = useState("");
  const [participantsField, setParticipants] = useState(Store.users[0].id);
  const [dayField, setDay] = useState(Store.workingDays[0]);
  const [timeField, setTime] = useState(Store.workingHours[0]);

  let handleSubmit = (evt) => {

    let object = {
      name: nameField,
      day: dayField,
      time: timeField,
      participants: participantsField
    };
  };

  let users = []; 
  Store.users.map(item => {
    users.push({
      value: item.id,
      label: item.data.name
    });
  });


  return (
    <form onSubmit={handleSubmit} className="event-creation-form">
      <label className="event-creation-form__item">
            Name:   
            <input
                className="event-creation-form__input"
                id="name"
                onChange={e => setName(e.target.value)}
            ></input>
        </label>

        {/* <label className="event-creation-form__item">
          Members:

          <MultiSelect rootClassName="event-creation-form__input">
            { users }
          </MultiSelect>
        </label> */}

        <label 
            className="event-creation-form__item"
            id="select-participants"
        >
          <multi-select users={users}></multi-select>
        </label>        

        <label 
            className="event-creation-form__item" 
        >Day:
          <select 
              className="event-creation-form__input"
              id="select-days"
              onChange={e => setDay(e.target.value)}
          >
            {
              Store.workingDays.map((item, index) => 
                <option value={item} key={index}>{item}</option>  
              )
            }
          </select>
        </label>

        <label 
            className="event-creation-form__item" 
        >Time:
            <select 
              className="event-creation-form__input"
              id="select-time"
              onChange={e => setTime(e.target.value)}
            >
              {
                Store.workingHours.map((item, index) => 
                  <option value={item} key={index}>{item}:00</option>
                )
              }
            </select>
        </label>

        <div className="event-creation-form__button-wrapper">
          <button type="submit" className="event-creation-form__button button-submit">Create</button>
          <button className="event-creation-form__button button-cancel">Cancel</button>
        </div>
    </form>
  )
}


