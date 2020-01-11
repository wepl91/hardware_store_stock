import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Text, H2, Button, Spinner } from "@blueprintjs/core";
import Modal from '../../components/modal';
import Table from '../../components/table';
import fire from '../../fire';
import ProductDetails from './ProductDetails';
import './styles.scss';

const ProductsList = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null);
  
  const getProduct = (setProducts, setIsLoading) => {
    fire.collection('products').get().then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      let prods = [];
      snapshot.forEach(doc => {
        debugger
        let prod = Object.assign({}, doc.data(), {id: doc.id})
        prods.push(prod);
      });
      setProducts(prods)
      setIsLoading(false)
    });
  }
  
  useEffect(() => {
    if (!products) {
      getProduct(setProducts, setIsLoading);
    }
  })

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
      label: 'Referencia',
      content: (data) => `${data.reference}`,
    },
    { 
      label: 'Nombre',
      content: (data) => data.name || '-',
    },
    { 
      label: 'Descripción',
      content: (data) => data.description || '-',
    },
    { 
      label: 'Precio',
      content: (data) => data.price ? `$${data.price}` : '-',
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

  return isLoading ? <Spinner /> : 
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
        content={<ProductDetails product={selectedRow}/>}
      />
    </div>
}

export default withRouter(ProductsList);