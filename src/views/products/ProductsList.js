import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Text, H2, Button } from "@blueprintjs/core";
import ReactDataGrid from 'react-data-grid';
import Modal from '../../components/modal';
import './styles.scss'

const ProductsList = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  
  const onClickNewProd = (props) => {
    props.history.push(`${props.history.location.pathname}/new`)
  }
  
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
    { key: 'count', name: 'Count' },
    { key: 'action', name: 'Actions' }];

  const rows = [
    { id: 0, title: 'row1', count: 20 }, { id: 1, title: 'row1', count: 40 }, { id: 2, title: 'row1', count: 60 },
    { id: 3, title: 'row1', count: 80 }, { id: 4, title: 'row1', count: 100 }, { id: 5, title: 'row1', count: 120 },
    { id: 6, title: 'row1', count: 140 }, { id: 7, title: 'row1', count: 160 }, { id: 8, title: 'row1', count: 180 },
  ];
  const actions = (setShowDialog, setSelectedRow, row) => {
    return [
      {
        icon: <Button className="bp3-minimal" icon="delete" text="" intent="primary" />,
        callback: () => {
          setShowDialog(true);
          setSelectedRow(row);
        }
      },
    ];
  } 

  const getCellActions = (column, row, setShowDialog, setSelectedRow) => {
    const cellActions = {
      action: actions(setShowDialog, setSelectedRow, row)
    };
    return cellActions[column.key];
  }

  const closeDialog = (setShowDialog, setSelectedRow) => {
    setShowDialog(false);
    setSelectedRow(null);
  }

  return (
    <div className="product-list-container">
      <H2><Text>Listado de productos</Text></H2>
      <Button
        className="new-product-button"
        text="Nuevo producto"
        intent="primary"
        onClick={() => onClickNewProd(props)} />
      <ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        getCellActions={(col, row) => getCellActions(col, row, setShowDialog, setSelectedRow)}
        rowsCount={rows.length} />
      <Modal
        key={showDialog}
        isOpen={showDialog}
        onClose={() => closeDialog(setShowDialog, setSelectedRow)}
        title="Detalle de producto"
        content={selectedRow && <Text>{`El producto seleccionado es el id ${selectedRow.id}`}</Text>}
      />
    </div>
  )
}

export default withRouter(ProductsList);