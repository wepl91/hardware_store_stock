import React from 'react';
import './styles.scss';
import TableRow from './table-row';
import Paginate from '../paginate'

const Table = ({ columns, data, withPagination, totalPages, currentPage, quantityShown, onPaginate }) => {
  const tableHeaders = (columns) => {
    return columns.map(column => 
      <th 
        key={`header-${column.label}`} 
        style={{width: `${100/columns.length}%`}} 
        className={`table-column-cell ${column.align}`} 
      >{column.label}</th>)
  }

  return(
    <React.Fragment>
      <table className="bp3-html-table">
        <thead>
          <tr className="table-row header">
            { tableHeaders(columns) }
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => ( <TableRow index={index} key={element.id} columns={columns} data={element} />))}
        </tbody>
      </table>
      { withPagination && totalPages && totalPages > 1 &&
        <Paginate 
          currentPage={currentPage} 
          totalPages={totalPages} 
          quantityShown={quantityShown || 2}
          onChange={(page) => onPaginate(page)}/> }
    </React.Fragment>);
}

export default Table;