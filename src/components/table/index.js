import React from 'react';
import './styles.scss';
import TableRow from './table-row';

const Table = ({columns, data}) => {
  const tableHeaders = (columns) => {
    return columns.map(column => 
      <th style={{width: `${100/columns.length}%`}} className={`table-column-cell ${column.align}`} >{column.label}</th>)
  }

  return(
    <table class="bp3-html-table">
      <thead>
        <tr className="table-row header">
          {tableHeaders(columns)}
        </tr>
      </thead>
      <tbody>
        {data.map((element, index) => ( <TableRow index={index} key={element.id} columns={columns} data={element} />))}
      </tbody>
    </table>);
}

export default Table;