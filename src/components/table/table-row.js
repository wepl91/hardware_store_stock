import React from 'react';

const TableRow = ({columns, data, index}) => {
  const renderContent = (content) => {
    if (React.isValidElement(content)) return content;
    if (typeof content === 'string') return content
    if (typeof content === 'function') return renderContent(content(data));
    if (Array.isArray(content)) return <div className="table-column-content">{content}</div>
  };
  return (
    <tr className={`table-row ${index % 2 !== 0 && 'dark'}`}>
      { columns.map(column => 
        <td className={`table-column-cell ${column.align || ''}`} style={{width: `${100/columns.length}%`}}>
          {renderContent(column.content)}
        </td>) }
    </tr>);
}

export default TableRow;