import React, { useEffect, useState } from "react";
import "./MultiSelect.scss";

function MultiSelect(props) {

  const [selected, setValue] = useState([]);
  const [dropDown, showDropDown] = useState(false);

  const handleClick = (evt) => {
    evt.preventDefault();
    if(evt.classList.contains("multi-select")) {
      showDropDown(!dropDown);
    } else if (!evt.classList.contains("multi-select__dropdown-item")) {
      showDropDown(false);
    }
  }
  
  const chooseValue = (item) => {
      let arr = selected;
      if (item.value) {
        // arr.push(item);
        setValue(item);
      } else {

      }

    };
  
  document.onclick = e => handleClick(e.target);

  return (
    <div className={`multi-select ${props.rootClassName}`}>
      <p className="multi-select__value">
        { selected.length > 0 ? selected.map(item => item.label).join(", ") : "Choose members" }
      </p>
      {
        dropDown &&
        <div className="multi-select__dropdown">
          <span 
            className="multi-select__dropdown-item"
            value=""
            onClick={chooseValue({label: "Select All", vaue: null})}
          >
            Select All 
          </span>
          { 

            props.children.map((item, index) => 
              <span 
                className="multi-select__dropdown-item"
                key={index} 
                onClick={chooseValue(item)}
              >
                {item.label}
              </span>
            )
          }
        </div>
      }
    </div>
  )
}

// function SelectOption(props) {

//   const [selected, setSelected] = useState(false);

//   const handleClick = (evt) => { 
//     props.setRootValue({
//       label: props.label,
//       value: props.value
//     });

//     setSelected(!selected);
//   };

//   return (
//     <span 
//       className={
//         selected ? "multi-select__dropdown-item selected"  : "multi-select__dropdown-item" 
//       }
    
//       onClick={e => handleClick(e)}
//     >
//       {props.label}
//     </span>
//   )
// }

export {
  MultiSelect,
  // SelectOption
}