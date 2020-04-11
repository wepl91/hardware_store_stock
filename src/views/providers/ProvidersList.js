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
import { 
  getProviders,
  getProvidersCount,
  deleteProvider
} from '../../services/providers';
import ProviderCreateModal from '../products/components/ProviderCreateModal';

import './styles.scss';

class ProvidersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      selectedRow: null,
      isLoading: true,
      providers: null,
      totalPages: 1,
      currentPage: 1,
      showCreate: false,
    }
  }

  componentDidMount() {
    if (!this.state.products) {
      this.getPaginationData();
    }
  }

  getPaginationData() {
    getProvidersCount().then(response => {
      if (response > 20) {
        const pages = Math.ceil(response/20);
        this.setState({
          totalPages: pages,
        }, () => {
          getProviders(1).then(response => {
            this.setState({
              providers: response,
              isLoading: false,
            });
          });
        });
      }
      else {
        getProviders(1).then(response => {
          this.setState({
            providers: response,
            isLoading: false,
          });
        });
      }
    })
  }

  afterCreateProvider(provider) {
    window.location.reload();
  }

  onClickDelete = (data) => {
    this.setState({
      isLoading: true,
    }, () => {
      deleteProvider(data.id)
      .then(res => {
        getProviders(this.state.currentPage)
          .then(response => {
            this.setState({
              providers: response,
              isLoading: false,
            });
          });
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
            style={{width: '200px'}}
            className="menu-providers"
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
    const { providers, isLoading, showCreate } = this.state;
    return isLoading ? <Spinner /> : 
      <div className="providers-list-container">
        <H2><Text>Listado de Proveedores</Text></H2>
        <Button
          className="new-provider-button"
          text="Nuevo proveedor"
          intent="primary"plus
          icon="plus"
          onClick={() => this.setState({ showCreate: true })} />
        <Table columns={this.columns()} data={providers} />
        <ProviderCreateModal 
          showModal={showCreate}
          onClose={() => this.setState({ showCreate: false })}
          onCreate={(newProvider) => this.afterCreateProvider(newProvider)}
          />
      </div>
  }
}

export default withRouter(ProvidersList);