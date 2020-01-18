import React, { Component } from 'react';
import { Select } from "@blueprintjs/select";
import { MenuItem, Button, Alignment } from "@blueprintjs/core";
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
    const prevProviders = Array.from(this.state.currentProviders);
    prevProviders.push(newProvider)
      
    this.setState({
      showModal: false,
    }, () => {
      this.props.onAddProvider && this.props.onAddProvider(prevProviders, true)
    })
  }

  handleNewProvider(newProvider) {
    const prevProviders = Array.from(this.state.currentProviders);
    prevProviders.push(newProvider);

    this.setState({
      addProvider: false,
    }, () => {
      this.props.onAddProvider && this.props.onAddProvider(prevProviders)
    });
  }

  handleSelect(provider, index) {
    const prevProviders = Array.from(this.state.currentProviders);
    prevProviders[index] = provider;

    this.props.onAddProvider && this.props.onAddProvider(prevProviders);
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
    return `${prov.name}`.indexOf(query.toLowerCase()) >= 0
  };

  renderSelectedProviders(allProviders) {
    const ret = [];
    const { currentProviders } = this.state;
    currentProviders.forEach((provider, index) => {
      provider.id && ret.push(
        <Select
          key={provider.id}
          itemPredicate={this.filterProviders}
          items={allProviders}
          itemRenderer={this.renderProviders}
          onItemSelect={(provider) => this.handleSelect(provider, index)}
          noResults={<MenuItem disabled text="Sin resultados." />}
        >
          <Button alignText={Alignment.LEFT} className="bp3-minimal" rightIcon="caret-down" active text={provider.name} />
        </Select>)
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