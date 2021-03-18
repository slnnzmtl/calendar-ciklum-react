import React, { useEffect, useState } from "react";

export default function SelectItem({item, handleClick}) {
  
  const [selected, setSelected] = useState(false);
  
  return (
    <span 
      className={
        `multi-select__dropdown-item ${selected ? "selected" : ""}`
      }
      onClick={() => {
        handleClick(item, selected)
        setSelected(!selected)
      }}
    >
      {item.label}
    </span>
  )
}