import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Text, H2, Button, Spinner, Tooltip, Position } from "@blueprintjs/core";
import Modal from '../../components/modal';
import Table from '../../components/table';
import fire from '../../fire';
import ProductDetails from './ProductDetails';
import './styles.scss';

class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      selectedRow: null,
      isLoading: true,
      products: null,
    }
  }

  componentDidMount() {
    if (!this.state.products) {
      this.getProduct();
    }
  }

  
  getProduct = () => {
    fire.collection('products').get().then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      let prods = [];
      snapshot.forEach(doc => {
        let prod = Object.assign({}, doc.data(), {id: doc.id})
        prods.push(prod);
      });

      this.setState({
        products: prods,
        isLoading: false,
      });
    });
  }

  onClickNewProd = (props) => {
    props.history.push(`${props.history.location.pathname}/new`)
  }

  onClickDetails = (data) => {
    this.setState({
      showDialog: true,
      selectedRow: data,
    })
  }

  onClickDelete = (data) => {
    this.setState({
      isLoading: true,
    }, () => {
      fire.collection('products').doc(data.id).delete()
      .then(res => {
        this.getProduct()
      });
    })
    
  }

  closeDialog = () => {
    this.setState({
      showDialog: false,
      selectedRow: null,
    })
  }
  
  columns = () =>  [
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
        <div className="product-list-action-buttons">
          <Tooltip content="Detalles" position={Position.BOTTOM_LEFT}>
            <Button 
                className="bp3-minimal details" 
                icon="more" 
                onClick={() => this.onClickDetails(data)} 
                intent="primary" />
          </Tooltip>
          <Tooltip content="Eliminar" position={Position.BOTTOM_LEFT}>
            <Button 
              className="bp3-minimal delete" 
              icon="delete" 
              onClick={() => this.onClickDelete(data)} 
              intent="primary" />
          </Tooltip>
        </div>,
      align: 'right',
    },
  ];

  render() {
    const { products, isLoading, showDialog, selectedRow } = this.state;
    return isLoading ? <Spinner /> : 
      <div className="product-list-container">
        <H2><Text>Listado de Productos</Text></H2>
        <Button
          className="new-product-button"
          text="Nuevo producto"
          intent="primary"plus
          icon="plus"
          onClick={() => this.onClickNewProd()} />
        <Table columns={this.columns()} data={products} />
        <Modal
          key={showDialog}
          isOpen={showDialog}
          onClose={() => this.closeDialog()}
          title="Detalle de producto"
          content={<ProductDetails product={selectedRow}/>}
        />
      </div>
  }
}

export default withRouter(ProductsList);