import React, { useState } from "react";
import Store from "../../utils/store";
import { onDragStart } from "../../utils/draggable";
import "./EventFlag.scss";

export default function EventFlag(props) {

  let showRemoveWindow = () => {
    window.location.hash = `remove/${props.data.id}`
  };

  return (
    <div 
      className="event-flag" 
      draggable="true"
      onDragStart={onDragStart}
    >
      { 
        Store.isAdmin &&
        <button 
          className="event-flag__button"
          onClick={showRemoveWindow}
        >
          X
        </button> 
      }
      <p className="event-flag__name">{ props.data.name }</p>
    </div>
  );
}