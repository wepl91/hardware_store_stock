import React, { useState } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Button, Navbar, Position, Tooltip } from "@blueprintjs/core";
import Sidebar from "react-sidebar";
import MenuContent from '../components/menu-content';
import ProductRouter from './ProductsRouter';
import './styles.scss';

const AppRouter = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return props.loggedInUser && Object.keys(props.loggedInUser).length ? //Check loggedInUser
    <Sidebar
      sidebar={ <MenuContent onChange={() => setMenuOpen(!menuOpen)}/>}
      open={menuOpen}
      onSetOpen={() => setMenuOpen(!menuOpen)}
      styles={{ sidebar: { background: "white" } }}>
      <Navbar>
        <Navbar.Group>
          <div className="menu-button-container">
            <Button
              className="bp3-minimal"
              icon={menuOpen ? 'menu-closed' : 'menu-open'}
              onClick={() => setMenuOpen(!menuOpen)} />
          </div>
          <Navbar.Divider />
          <div className="navbar-actions-container">
            <div className="bp3-input-group .modifier search-input">
              <span className="bp3-icon bp3-icon-search"></span>
              <input className="bp3-input" type="search" placeholder="Buscar" dir="auto" />
            </div>
          </div>
        </Navbar.Group>
        <div className="logout-container">
          <Tooltip content="Cerrar sesión" position={Position.BOTTOM_LEFT}>
            <Button className="bp3-minimal" icon="log-out" onClick={() => props.onSignOut()}/>
          </Tooltip>
        </div>
      </Navbar>
      <div className="layout-container">
        <ProductRouter />
      </div>
    </Sidebar> :
    <Switch>
      <Redirect to={`/session/signin`} component={null} />
    </Switch>
};

export default withRouter(AppRouter);