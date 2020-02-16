import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import ProvidersList from '../views/providers/ProvidersList';
import './styles.scss';

const ProductsRouter = (props) => {
  const path = props.match.path;
  const location = props.location;
  return (
    <Switch location={location}>
      <Route path={`${path}/providers/list`} component={ProvidersList} />
      <Route path={`${path}/providers/new`} component={null} />
      <Route path={`${path}/providers`} component={ProvidersList} />
    </Switch>);
}

export default withRouter(ProductsRouter);




