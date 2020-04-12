import React, { useState, useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Sidebar from "react-sidebar";
import MenuContent from '../components/menu-content';
import SidebarFixed from '../components/sidebar-fixed';
import HeaderNavbar from '../components/header-navbar';
import ProductRouter from './ProductsRouter';
import ProvidersRouter from './ProvidersRouter';
import HomeRouter from './HomeRouter';
import { 
  ListProductsContent,
  ListProvidersContent,
  NewProductContent,
  NewProviderContent 
} from '../components/menu-content/content';
import './styles.scss';

const AppRouter = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const getSideBarContent = () => {
    const location = props.location.pathname;
    if (location.includes('products')) {
      if (location.includes('new')) {
        return <NewProductContent />
      }
      if (location.includes('list') || location.split('products')[1] === '') {
        return <ListProductsContent />;
      }
    }
    if (location.includes('providers')) {
      if (location.includes('new')) {
        return <NewProviderContent />
      }
      if (location.includes('list') || location.split('providers')[1] === '') {
        return <ListProvidersContent />;
      }
    }
  }

  let sideBarContent = getSideBarContent();

  useEffect(() => {
    getSideBarContent();
  });


  return props.loggedInUser && Object.keys(props.loggedInUser).length ? //Check loggedInUser
    <Sidebar
      sidebar={ <MenuContent onChange={() => setMenuOpen(!menuOpen)}/>}
      open={menuOpen}
      onSetOpen={() => setMenuOpen(!menuOpen)}
      styles={{ sidebar: { background: "white" } }}>
      <HeaderNavbar 
        onSignOut={props.onSignOut} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} />
      <SidebarFixed>
        { sideBarContent }
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