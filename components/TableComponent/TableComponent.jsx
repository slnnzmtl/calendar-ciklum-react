import './TableComponent.scss';
import React, {useEffect, useState} from 'react';
import * as Data from '../../assets/data.js';
import '../../utils/draggable';
import TableColumn from '../TableColumn/TableColumn.jsx';
import Store from '../../utils/store';

export default function TableComponent() {

  const columns = Data.workingDays;
  const rows = Data.workingHours;

  const [ready, setReady] = useState(false);

  Store.getEvents()
  .then(() => {
    setReady(true);
  })


  return (
    <div className="calendar">
      {
        ready &&
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
            />
          )}
        </div>
      }
    </div>
  );
};
