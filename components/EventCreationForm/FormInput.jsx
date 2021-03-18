import React, { useEffect, useState } from "react";
import formValidate from "../../utils/formValidate";

export default function FormField({id, name, label, returnValue, errorClass}) {

  return (
    <label className="event-creation-form__item">
      {label}
      <input
          className={`event-creation-form__input ${errorClass ? "error" : ""}`}
          id={id}
          name={name}
          onChange={(e) => returnValue(e.target.value)}
      ></input>
    </label>
  )
}