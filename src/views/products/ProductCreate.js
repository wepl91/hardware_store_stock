import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  Text,
  H2,
  InputGroup,
  Button,
  Spinner,
} from "@blueprintjs/core";
import ProviderAdd from './components/ProviderAdd';
import fire from '../../fire';
import { withToastManager } from 'react-toast-notifications';
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
      isLoading: true,
      isSaving: false,
      allProviders: [],
    }

    this.handleSave = this.handleSave.bind(this);
    this.handleAddProvider = this.handleAddProvider.bind(this);
  }

  componentDidMount() {
    this.getProviders();
  }

  getProviders() {
    fire.collection('providers').get().then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      let providers = [];
      snapshot.forEach(doc => {
        let prov = Object.assign({}, doc.data(), { id: doc.id })
        providers.push(prov);
      });
      this.setState({
        isLoading: false,
        allProviders: providers,
      });
    });
  }

  handleAddProvider(newProviders) {
    this.setState({
      providers: newProviders,
    });
  }

  handleSave() {
    const { toastManager } = this.props;
    this.setState({
      isSaving: true,
    }, () => {
      const newProd = {
        name: this.state.name,
        price: this.state.price,
        reference: this.state.reference,
        description: this.state.description,
        providers: this.state.providers,
      }
      fire.collection('products').doc()
        .set(newProd)
        .then(res => {
          this.props.history.push(`${this.props.history.location.pathname}/list`)
        })
        .catch(err => {
          toastManager.add('Ups! Parece que hubo un error al guardar! Inténtalo nuevamente más tarde', {
            appearance: 'error',
            autoDismiss: true,
            pauseOnHover: false,
          });
          this.setState({
            isLoading: false,
            isSaving: false,
          })
        })
    })
  }

  render() {
    const { isLoading, isSaving } = this.state;
    return isLoading ? <Spinner /> :
      <div className="product-create-container">
        <H2><Text>Nuevo Producto</Text></H2>
        <div className="left-container">
          <div className="field">
            <Text className="label"><strong>Nombre:</strong></Text>
            <InputGroup
              className="form-control"
              placeholder="Ejemplo: Clavo"
              disabled={isLoading || isSaving}
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })} />
          </div>
          <div className="field">
            <Text className="label"><strong>Precio:</strong></Text>
            <InputGroup
              className="form-control"
              disabled={isLoading || isSaving}
              value={this.state.price}
              leftIcon="dollar"
              onChange={(e) => this.setState({ price: e.target.value })} />
          </div>
          <div className="field">
            <Text className="label"><strong>Proveedores:</strong></Text>
            <ProviderAdd
              disable={isLoading || isSaving}
              allProviders={this.state.allProviders}
              key={this.state.providers}
              currentProviders={this.state.providers}
              onAddProvider={this.handleAddProvider} />
          </div>
        </div>
        <div className="right-container">
          <div className="field">
            <Text className="label"><strong>Referencia:</strong></Text>
            <InputGroup
              className="form-control"
              placeholder="Ejemplo: 1253"
              disabled={isLoading || isSaving}
              value={this.state.reference}
              onChange={(e) => this.setState({ reference: e.target.value })} />
          </div>
          <div className="field">
            <Text className="label"><strong>Descripción:</strong></Text>
            <InputGroup
              className="form-control"
              disabled={isLoading || isSaving}
              placeholder="Ejemplo: Clavo de 3 cm"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })} />
          </div>
        </div>
        <Button
          className="new-product-button"
          text={isLoading || isSaving ? 'Guardando..' : 'Guardar'}
          disabled={isLoading || isSaving}
          intent="primary"
          loading={isLoading || isSaving}
          onClick={this.handleSave} />
      </div>;
  }

}

export default withToastManager(withRouter(ProductCreate));