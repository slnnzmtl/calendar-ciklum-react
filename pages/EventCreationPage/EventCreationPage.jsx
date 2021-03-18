import React, { useEffect, useState } from "react";
import EventCreationForm from "../../components/EventCreationForm/EventCreationForm.jsx";
import ErrorsHandler from "../../components/ErrorsHandler/ErrorsHandler.jsx";

import "./EventCreationPage.scss";

export default function EventCreationPage({users}) {

  const [error, setError] = useState();
  
  return (
    <div className="event-creation">
        {
          error && 
          <ErrorsHandler error={error} />
        }
        <EventCreationForm users={users} returnError={value => setError(value)} /> :
    </div>
  )
}