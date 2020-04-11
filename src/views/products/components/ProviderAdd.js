import React, { Component } from 'react';
import { Select } from "@blueprintjs/select";
import { MenuItem, Button, Alignment, Tag } from "@blueprintjs/core";
import ProviderCreateModal from './ProviderCreateModal';
import './styles.scss';

class ProviderAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProviders: props.currentProviders || [],
      addProvider: false,
      createProvider: false,
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleNewProvider = this.handleNewProvider.bind(this);
    this.handleCreateProvider = this.handleCreateProvider.bind(this);

    this.renderProviders = this.renderProviders.bind(this);
  }

  handleCreateProvider(newProvider) {
    const { onAddProvider } = this.props; 
    const prevProviders = Array.from(this.state.currentProviders);
    prevProviders.push(newProvider)
      
    this.setState({
      showModal: false,
    }, () => {
      onAddProvider && onAddProvider(prevProviders, true)
    })
  }

  handleNewProvider(newProvider) {
    const { onAddProvider } = this.props;
    const prevProviders = Array.from(this.state.currentProviders);
    prevProviders.push(newProvider);

    this.setState({
      addProvider: false,
    }, () => {
      onAddProvider && onAddProvider(prevProviders)
    });
  }

  removeProvider(provider) {
    const { onAddProvider } = this.props;
    let prevProviders = Array.from(this.state.currentProviders);
    prevProviders = prevProviders.filter(prov => prov.id != provider.id);
    
    this.setState({
      addProvider: false,
    }, () => onAddProvider && onAddProvider(prevProviders));
  }

  handleSelect(provider, index) {
    const { onAddProvider } = this.props;
    const prevProviders = Array.from(this.state.currentProviders);
    prevProviders[index] = provider;

    onAddProvider && onAddProvider(prevProviders);
  }

  renderProviders(item, props) {
    return item.id === 'add' ?
      <MenuItem
        key={item.id}
        icon="plus"
        text="Crear proveedor"
        onClick={() => this.setState(prevState => ({createProvider: !prevState.createProvider}))}
        shouldDismissPopover
      /> :
      <MenuItem
        key={item.id}
        text={item.name}
        onClick={props.handleClick}
        label={`Tel: ${item.phone_number}`}
        shouldDismissPopover
      /> 
  }

  filterProviders(query, prov) {
    if (!prov || !prov.name) return true;
    return prov.name.toLowerCase().includes(query.toLowerCase())
  };

  renderSelectedProviders(allProviders) {
    const ret = [];
    const { currentProviders } = this.state;
    currentProviders.forEach((provider, index) => {
      provider.id && ret.push(
        <Tag 
          round
          large
          minimal 
          onRemove={() => this.removeProvider(provider)}>{provider.name}</Tag>
      )
    });
    return ret;
  }

  render() {
    const { currentProviders, createProvider } = this.state;
    const { allProviders } = this.props;
    return (
      <div className="provider-add-container">
        {currentProviders.length > 0 && this.renderSelectedProviders(allProviders)}
        {this.state.addProvider &&
          <Select
            itemPredicate={this.filterProviders}
            items={allProviders}
            itemRenderer={this.renderProviders}
            onItemSelect={this.handleNewProvider}
            noResults={<MenuItem icon="plus" text="Sin resultados. Crear proveedor?" />}
          >
            <Button alignText={Alignment.LEFT} className="bp3-minimal" rightIcon="caret-down" active text="Proveedor..." />
          </Select>}
        <Button
          className="bp3-minimal"
          icon="plus"
          text="Agregar proveedor"
          disabled={this.state.addProvider}
          onClick={() => this.setState(prevState => ({ addProvider: !prevState.addProvider }))}
          intent="primary" />
        { createProvider && 
          <ProviderCreateModal
            showModal={createProvider}
            onCreate={this.handleCreateProvider}
            onClose={() => this.setState(prevState => ({createProvider: !prevState.createProvider}))}
          /> }
      </div>)
  }

}

export default ProviderAdd;