import React, { useContext, useEffect, useState } from "react";
import SelectItem from "./SelectItem.jsx";
import "./MultiSelect.scss";

export default function MultiSelect(props) {
  
  const [selected, setValue] = useState([]);
  const [dropDown, showDropDown] = useState(false);

  useEffect(() => {
    if (selected && selected.length) {
      props.handleChange(selected);
    } else {
      props.handleChange(props.data);
    }

      return () => props.handleChange([]);
  }, [selected]);
  
  const chooseItem = (item, isSelect) => {
    if (!isSelect) {
      setValue([...selected, item]);
    } else {
      setValue(selected.filter(
        element => element.value !== item.value
      ));
    }
  };

  return (
    <div 
      className={`multi-select ${props.rootClassName}`}
    >
      <p className="multi-select__value"
        onClick={() => {
          showDropDown(!dropDown);
        }}
      >
        {
          selected && selected.length > 0 ? 
          selected.map(item => item.label).join(", ") : 
          props.data.map(item => item.label).join(", ")
        }
        <img 
          src="/assets/arrowDown.png" 
          className="multi-select__value-arrow"
        />
      </p>
      {
        <div className={`multi-select__dropdown ${dropDown && "open"}`}>
          {props.data.map((item) => 
            <SelectItem key={item.value} item={item} handleClick={chooseItem} />
          )}
        </div>
      }
    </div>
  )
}
