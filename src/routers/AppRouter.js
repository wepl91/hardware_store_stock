import React, { useState } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Button, Navbar, Position, Tooltip } from "@blueprintjs/core";
import Sidebar from "react-sidebar";
import MenuContent from '../components/menu-content';
import SidebarFixed from '../components/sidebar-fixed';
import HeaderNavbar from '../components/header-navbar';
import ProductRouter from './ProductsRouter';
import ProvidersRouter from './ProvidersRouter';
import HomeRouter from './HomeRouter';
import './styles.scss';

const AppRouter = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return props.loggedInUser && Object.keys(props.loggedInUser).length ? //Check loggedInUser
    <Sidebar
      sidebar={ <MenuContent onChange={() => setMenuOpen(!menuOpen)}/>}
      open={menuOpen}
      onSetOpen={() => setMenuOpen(!menuOpen)}
      styles={{ sidebar: { background: "white" } }}>
      <HeaderNavbar onSignOut={props.onSignOut} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <SidebarFixed>
        <h3>Sidebar fixed</h3>
        <label>Acá puede haber información de la sección o el modulo de ventas</label>
      </SidebarFixed>
      <div className="layout-container">
        <HomeRouter loggedInUser={props.loggedInUser}/>
        <ProductRouter />
        <ProvidersRouter />
      </div>
    </Sidebar> :
    <Switch>
      <Redirect to={`/session/signin`} component={null} />
    </Switch>
};

export default withRouter(AppRouter);