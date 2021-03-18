import React from "react";

export default function RemoveWindow({name, removeEvent, closeWindow}) {
  return (  
    <div className="remove-event">
      <p className="remove-event__title">Are you sure you want to delete «<span>{name}</span>» event?</p>
      <div className="remove-event__buttons">
        <button 
          className="remove-event__button" 
          onClick={removeEvent}
        >
          Yes
        </button>
        <button 
          className="remove-event__button"
          onClick={closeWindow}
        >No</button>
      </div>
    </div>
  )
}