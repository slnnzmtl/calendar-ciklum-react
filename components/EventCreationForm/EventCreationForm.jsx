import React, { useEffect, useState } from "react";
import "./EventCreationForm.scss";
import Store from "../../utils/store";
import MultiSelect from "../MultiSelect/MultiSelect.jsx";
import FormInput from "./FormInput.jsx";
import formValidate from "../../utils/formValidate";

export default function EventCreationForm({users, returnError}) {

  const [name, setName] = useState(false);

  const [day, setDay] = useState(Store.workingDays[0]);
  const [time, setTime] = useState(Store.workingHours[0]);
  const [participants, setParticipants] = useState();
  const [errors, setErrors] = useState({});

  console.log('creation-form')

  useEffect(() => {
    
    formValidate({ 
      name, 
      day, 
      time, 
      participants: participants && participants.length ? participants : formatUsers(users)
    }, false)
    .then(result => setErrors(result));

  }, [name, day, time, participants]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    formValidate({ 
      name, 
      day, 
      time, 
      participants: participants && participants.length ? participants : formatUsers(users) 
    }, true)
    .then(result => {
      setErrors(result);

      if(checkErrors(result)) {
        createEvent({ name, participants, day, time });
      }
    });
  };

  const createEvent = (object) => {

    Store.pushEvent(object)
    .then(() => window.location.hash = "/")
    .catch(error => returnError(error));
  };

  const checkErrors = ({name, participants, day, time}) => (
    name.result || participants.result || day.result || time.result
    ) ? false : true;

  const formatUsers = (array) => {
    if (Array.isArray(array)) {

      let formatted = array.map(item => ({
        value: item.id,
        label: item.data.name
      }));

      return formatted;
    } else {

      return [];
    }
  };

  let cancel = () => window.location.hash = "";

  return (
    <form onSubmit={handleSubmit} className="event-creation-form">
        
        <FormInput 
          name="name" 
          label="Name" 
          id="select-name" 
          placeholder="Enter name: " 
          returnValue={value => setName(value)} 
          errorClass={errors.name && errors.name.result}
        />
        
        <label className="event-creation-form__item">
          Members:

          <MultiSelect rootClassName="event-creation-form__input" data={formatUsers(users)} handleChange={setParticipants} />
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
          <button className="event-creation-form__button button-cancel" onClick={cancel}>Cancel</button>
        </div>
    </form>
  )
}


