import React from "react";
import EventCreationForm from "../../components/newEvent/newEvent.js";

import "./EventCreationPage.scss";

customElements.define("new-event", EventCreationForm);

export default function EventCreationPage() {

  return (
    <div className="event-creation">
      {/* <EventCreationForm /> */}
      <new-event />
    </div>
  )
}