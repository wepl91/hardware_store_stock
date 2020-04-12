import React from 'react';
import { withRouter } from 'react-router';
import { Button } from "@blueprintjs/core";
import './styles.scss';

const onClick = (props, route) => {
  props.history.push(`/app/${route}`);
  props.onChange && props.onChange();
}
const MenuContent = (props) => {
  return (
    <div className="menu-options-container">
      <Button 
        className="bp3-minimal" 
        icon="cog" 
        text="Productos"
        onClick={() => onClick(props, 'products/list')}
        intent="primary" />
      <Button 
        className="bp3-minimal" 
        icon="people" 
        text="Proveedores"
        onClick={() => onClick(props, 'providers/list')}
        intent="primary" />
      <Button 
        className="bp3-minimal" 
        icon="list-detail-view" 
        text="Ventas" 
        onClick={() => onClick(props, 'sales/list')}
        intent="primary" />
  </div> );
}

export default withRouter(MenuContent);