import React, { Component } from 'react';
import { InputGroup, Button } from "@blueprintjs/core";
import './styles.scss';

class ProviderAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProviders: props.currentProviders || [],
      addProvider: false,
    }

    this.handleEditProvider = this.handleEditProvider.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.addProvider && !prevState.addProvider) {
      const prevProviders = Array.from(this.state.currentProviders);
      prevProviders.push('');
      
      this.props.onAddProvider && this.props.onAddProvider(prevProviders)
    }
  }

  handleEditProvider(e, index) {
    const prevProviders = Array.from(this.state.currentProviders)
    prevProviders[index] = e.target.value;

    this.setState({
      currentProviders: prevProviders,
    })
  }

  render() {
    const { currentProviders } = this.state;
    debugger
    return(
      <div className="provider-add-container">
        { !currentProviders.length ? 
            <div className="provider-add-container-row">
              <InputGroup placeholder="Proveedor" onChange={this.handleEditProvider}/>
            </div> : 
          currentProviders.map((provider, index) => 
            <div>
              <InputGroup
                className="provider-add-container-row" 
                value={provider} 
                onChange={(e) => this.handleEditProvider(e, index)}
                key={`${provider} - ${index}`} />
            </div>) }
        <Button 
          className="bp3-minimal" 
          text="Agregar proveedor" 
          icon="plus"
          onClick={() => this.setState(prevState => ({addProvider: !prevState.addProvider}))}
          intent="primary" />
      </div> )
  }

}

export default ProviderAdd;