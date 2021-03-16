import "./TableCell.scss";
import React, { useEffect, useState } from "react";
import EventFlag from "../EventFlag/EventFlag.jsx";
import Store from "../../utils/store";
import {subscribe} from "../../utils/eventBus";
import {onDragOver, onDrop} from "../../utils/draggable";

function TableCell({day, time, className = "", children = ""}) {

	const [eventFlag, setEventFlag] = useState();

	useEffect(() => {
		setEventFlag(Store.getEventByDate(day, time));

		return () => {
			setEventFlag(null);
		}
	})

	let drop = (evt) => {
		onDrop(evt, {day, time});
	}

	subscribe("refreshEvents", () => {
		setEventFlag(Store.getEventByDate(day, time));
	})

	return (
		<div 
			className={"table-cell " + className} 
			dropzone="true"
			onDragOver={onDragOver}
			onDrop={drop}
		>
			{ children }
			{ eventFlag ? <EventFlag data={eventFlag} day={day} time={time} /> : "" }
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