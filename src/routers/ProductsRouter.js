import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import ProductsList from '../views/products/ProductsList';
import ProductCreate from '../views/products/ProductCreate'
import './styles.scss';

const ProductsRouter = (props) => {
  const path = props.match.path;
  const location = props.location;
  return (
    <Switch location={location}>
      <Route path={`${path}/products/list`} component={ProductsList} />
      <Route path={`${path}/products/new`} component={ProductCreate} />
      <Route path={`${path}/products`} component={ProductsList} />
    </Switch>);
}

export default withRouter(ProductsRouter);




