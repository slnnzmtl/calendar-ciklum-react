import "./TableColumn.scss";
import React from "react";
import { TableCell, TableCellHeader } from "../TableCell/TableCell.jsx";

export default function TableColumn(props) {
	return (
		<div className="table-column">
			<TableCellHeader>{props.name}</TableCellHeader>
			{
				renderCell (
					props.type, 
					{
						array: props.rows,
						name: props.name
					}
				)
			}
		</div>
	)
}

function renderCell(value = "default", data) {
	return {
		header: renderTableCellHeader(data),
		default: renderTableCell(data)
	}[value];
}

function renderTableCell({ array, name }) {
	return (
		array.map((item, key) => 
			<TableCell 
				time={item} 
				day={name} 
				key={key} 
			/>
		) 
	)
}

function renderTableCellHeader({ array }) {
	return (
		array.map((item, key) => 
			<TableCellHeader key={key}>
				{item + ":00"}
			</TableCellHeader>
		) 
	)
}