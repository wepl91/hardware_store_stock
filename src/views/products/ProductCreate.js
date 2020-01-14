import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Text, H2, InputGroup, Button, Spinner } from "@blueprintjs/core";
import './styles.scss';

class ProductCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      reference: '',
      price: '',
      description: '',
      providers: [],
      isLoading: false,
    }

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {
    this.setState({
      isLoading: true,
    }, () => {
      const newProd = {
        name: this.state.name,
        price: this.state.price,
        reference: this.state.reference,
        description: this.state.description
      }
      debugger
    })
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="product-create-container">
        <H2><Text>Nuevo Producto</Text></H2>
          <div className="left-container">
            <div className="field">
              <Text className="label"><strong>Nombre:</strong></Text>
              <InputGroup 
                className="form-control" 
                placeholder="Ejemplo: Clavo"
                disabled={this.state.isLoading}
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value})}/>
            </div>
            <div className="field">
              <Text className="label"><strong>Precio:</strong></Text>
              <InputGroup 
                className="form-control" 
                placeholder="$"
                disabled={this.state.isLoading}
                value={this.state.price}
                leftIcon="dollar"
                onChange={(e) => this.setState({ price: e.target.value })}/>
            </div>
          </div>
          <div className="right-container">
            <div className="field">
              <Text className="label"><strong>Referencia:</strong></Text>
              <InputGroup 
                className="form-control" 
                placeholder="Ejemplo: 1253"
                disabled={this.state.isLoading}
                value={this.state.reference}
                onChange={(e) => this.setState({ reference: e.target.value })}/>
            </div>
            <div className="field">
              <Text className="label"><strong>Descripción:</strong></Text>
              <InputGroup 
                className="form-control" 
                disabled={this.state.isLoading}
                placeholder="Ejemplo: Clavo de 3 cm"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}/>
            </div>
          </div>
          <Button
            className="new-product-button"
            text={isLoading ? 'Guardando..' : 'Guardar'}
            disabled={isLoading}
            intent="primary"
            loading={isLoading}
            onClick={this.handleSave} />
      </div>)
  }

}

export default withRouter(ProductCreate);