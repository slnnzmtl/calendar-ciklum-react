import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import Store from "../../utils/store";  
import RemoveWindow from "../../components/RemoveWindow/RemoveWindow.jsx";

import "./EventRemovePage.scss";

export default function EventRemovePage() {

  let { id } = useParams();
  const [data, setData] = useState();
  
  useEffect(() => {
    if (Store.getEventById(id)) {
      var {data} = Store.getEventById(id)[0];
      setData(data);
    }
  })

  let removeEvent = () => {
    Store.deleteEvent(id, data);
  };
  
  let closeWindow = () => {
    window.location.hash = "/";
  };

  return (
    <div className="event-remove-page">
      {
        data &&
        <RemoveWindow id={id} name={data.name} removeEvent={removeEvent} closeWindow={closeWindow}/>
      }
    </div>
  )
}
