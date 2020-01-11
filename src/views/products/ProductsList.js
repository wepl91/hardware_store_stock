import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Text, H2, Button } from "@blueprintjs/core";
import Modal from '../../components/modal';
import {products} from '../../mocks';
import Table from '../../components/table';
import './styles.scss'

const ProductsList = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  
  const onClickNewProd = (props) => {
    props.history.push(`${props.history.location.pathname}/new`)
  }

  const onClickDetails = (setShowDialog, setSelectedRow, data) => {
    setShowDialog(true);
    setSelectedRow(data);
  }

    
  const closeDialog = (setShowDialog, setSelectedRow) => {
    setShowDialog(false);
    setSelectedRow(null);
  }
  
  const columns = (setShowDialog, setSelectedRow) =>  [
    { 
      label: 'ID',
      content: (data) => `${data.id}`,
    },
    { 
      label: 'Nombre',
      content: (data) => data.name,
    },
    { 
      label: 'Descripción',
      content: (data) => data.description,
    },
    { 
      label: 'Proveedores',
      content: (data) => data.providers.map(provider => provider),
    },
    { 
      label: 'Precio',
      content: (data) => `$${data.price}`,
      align: 'center'
    },
    { 
      label: '',
      content: (data) => 
          <Button 
            className="bp3-minimal" 
            icon="more" 
            onClick={() => onClickDetails(setShowDialog, setSelectedRow, data)} 
            intent="primary" />,
      align: 'right',
    },
  ];

  return (
    <div className="product-list-container">
      <H2><Text>Listado de productos</Text></H2>
      <Button
        className="new-product-button"
        text="Nuevo producto"
        intent="primary"plus
        icon="plus"
        onClick={() => onClickNewProd(props)} />
      <Table columns={columns(setShowDialog, setSelectedRow)} data={products} />
      <Modal
        key={showDialog}
        isOpen={showDialog}
        onClose={() => closeDialog(setShowDialog, setSelectedRow)}
        title="Detalle de producto"
        content={selectedRow && <Text>{`El producto seleccionado es ${JSON.stringify(selectedRow, 2,2)}`}</Text>}
      />
    </div>
  )
}

export default withRouter(ProductsList);