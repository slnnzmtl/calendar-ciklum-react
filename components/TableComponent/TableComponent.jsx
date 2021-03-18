import './TableComponent.scss';
import React, {useEffect, useState} from 'react';
import * as Data from '../../assets/data.js';
import '../../utils/draggable';
import TableColumn from '../TableColumn/TableColumn.jsx';

export default function TableComponent({events}) {

  const columns = Data.workingDays;
  const rows = Data.workingHours;
  

  return (
      <div className="calendar">
          <div className="table-container">
            
            <TableColumn
              rows={rows}
              name="Time"
              type="header"
            />

            {columns.map((column, index) => 
              <TableColumn 
                rows={rows}
                name={column} 
                key={index}
                events={events ? events[column] : []}
              />
            )}
          </div>
      </div>
  );
};
