import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { 
  Text, 
  H2, 
  Button, 
  Spinner, 
  Position,
  Popover,
  Menu,
  MenuItem 
} from "@blueprintjs/core";
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
      totalPages: 10, //test hardcoded
      currentPage: 1
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

  onClickNewProd = () => {
    this.props.history.push(`${this.props.history.location.pathname}/new`)
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
    });
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
          <Popover 
            position={Position.BOTTOM}
            content={
              <Menu>
                <MenuItem icon="plus" text="Detalles" onClick={() => this.onClickDetails(data)}/>
                <MenuItem icon="edit" text="Editar"/>
                <MenuItem icon="delete" text="Eliminar" onClick={() => this.onClickDelete(data)}/>
              </Menu>
            }>
            <Button 
              className="bp3-minimal details" 
              icon="more" 
              intent="primary" />
          </Popover>
        </div>,
      align: 'right',
    },
  ];

  onPaginate = (page) => {
    this.setState({
      currentPage: page,
    })
  }

  render() {
    const { 
      products, 
      isLoading, 
      showDialog, 
      selectedRow,
      totalPages,
      currentPage } = this.state;
    return isLoading ? <Spinner /> : 
      <div className="product-list-container">
        <H2><Text>Listado de Productos</Text></H2>
        <Button
          className="new-product-button"
          text="Nuevo producto"
          intent="primary"
          icon="plus"
          onClick={() => this.onClickNewProd()} />
        <Table 
          withPagination
          columns={this.columns()} 
          data={products} 
          totalPages={totalPages}
          currentPage={currentPage}
          onPaginate={(page) => this.onPaginate(page)} />
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