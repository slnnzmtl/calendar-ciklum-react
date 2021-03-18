import "./TableCell.scss";
import React from "react";
import EventFlag from "../EventFlag/EventFlag.jsx";
import Store from "../../utils/store";
import {subscribe} from "../../utils/eventBus";
import {onDragOver, onDrop} from "../../utils/draggable";

function TableCell({day, time, className = "", children = "", event}) {

	let drop = (evt) => {
		onDrop(evt, {day, time});
	}

	return (
		<div 
			className={"table-cell " + className} 
			dropzone="true"
			onDragOver={onDragOver}
			onDrop={drop}
		>
			{ children }
			{ event ? <EventFlag data={event} day={day} time={time} /> : "" }
		</div>
	)
}

function TableCellHeader({children}) {
	return (
		<TableCell className="table-header">
			{children}
		</TableCell>
	)
}

export {
	TableCell,
	TableCellHeader
}