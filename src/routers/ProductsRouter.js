import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ProductsList from '../views/products/ProductsList';
import './styles.scss';

const ProductsRouter = (props) => {
  const path = props.match.path;
  const location = props.location;
  return (
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.pathname}
        timeout={300}
        classNames="sectionTransition">
        <section className="transition-wrapper">
          <Switch location={location}>
            <Route path={`${path}/products/list`} component={ProductsList} />
            <Route path={`${path}/products/new`} component={null} />
            <Route path={`${path}/products`} component={ProductsList} />
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>

  )



}

export default withRouter(ProductsRouter);




