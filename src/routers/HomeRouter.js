import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Home from '../views/home/Home';
import './styles.scss';

const HomeRouter = (props) => {
  const path = props.match.path;
  const location = props.location;
  return (
    <Switch location={location}>
      <Route path={`${path}/home`} component={() => <Home loggedInUser={props.loggedInUser}/>} />
    </Switch>);
}

export default withRouter(HomeRouter);




