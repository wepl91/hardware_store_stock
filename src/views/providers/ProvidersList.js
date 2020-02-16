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

import Table from '../../components/table';
import fire from '../../fire';

import './styles.scss';

class ProvidersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      selectedRow: null,
      isLoading: true,
      providers: null,
    }
  }


  componentDidMount() {
    if (!this.state.products) {
      this.getProviders();
    }
  }

  getProviders = () => {
    fire.collection('providers').get().then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      let provs = [];
      snapshot.forEach(doc => {
        let prov = Object.assign({}, doc.data(), {id: doc.id})
        provs.push(prov);
      });

      this.setState({
        providers: provs,
        isLoading: false,
      });
    });
  }

  onClickDelete = (data) => {
    this.setState({
      isLoading: true,
    }, () => {
      fire.collection('providers').doc(data.id).delete()
      .then(res => {
        this.getProviders()
      });
    });
  }

  columns = () =>  [
    { 
      label: 'Nombre',
      content: (data) => data.name || '-',
    },
    { 
      label: 'Teléfono',
      content: (data) => data.phone_number || '-',
    },
    { 
      label: '',
      content: (data) => 
        <div className="product-list-action-buttons">
          <Popover 
            position={Position.BOTTOM}
            content={
              <Menu>
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

  render() {
    const { providers, isLoading, showDialog, selectedRow } = this.state;
    return isLoading ? <Spinner /> : 
      <div className="providers-list-container">
        <H2><Text>Listado de Proveedores</Text></H2>
        <Button
          className="new-provider-button"
          text="Nuevo proveedor"
          intent="primary"plus
          icon="plus"
          onClick={() => alert('Crear proveedor')} />
        <Table columns={this.columns()} data={providers} />
      </div>
  }
}

export default withRouter(ProvidersList);