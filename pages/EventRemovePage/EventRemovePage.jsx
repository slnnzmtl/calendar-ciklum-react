import React from "react";
import {useParams} from "react-router-dom";
import Store from "../../utils/store";  
import RemoveWindow from "../../components/removeEvent/RemoveWindow.jsx";

import "./EventRemovePage.scss";

export default function EventRemovePage() {

  let { id } = useParams();
  let { data } = Store.getEventById(id)[0];

  let removeEvent = () => {
    Store.deleteEvent(id, data);
  };
  
  let closeWindow = () => {
    window.location.hash = "/";
  };

  return (
    <div className="event-remove-page">
      <RemoveWindow id={id} name={data.name} removeEvent={removeEvent} closeWindow={closeWindow}/>
    </div>
  )
}
