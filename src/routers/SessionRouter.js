import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

// pages
import SignIn from '../views/sign-in/SignIn';

// routers
import AppRouter from './AppRouter';

const onUserLogged = (props, user) => {
  props.onSignIn && props.onSignIn(user);
}
const SessionRouter = (props) => {
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    document.title = `Hardware Store`;
  });
  return !props.loggedInUser || !Object.keys(props.loggedInUser).length ?
    <div className="card-container">
      <Switch>
        <Route exact path={`${props.match.path}/signin`} component={() => <SignIn onSignIn={(user) => onUserLogged(props, user)}/>} />
        <Redirect to={`${props.match.path}/signin`} component={() => <SignIn onSignIn={(user) => onUserLogged(props, user)}/>} />
      </Switch>
    </div> :
    <Switch>
      <Redirect to={`/app/home`} component={() => <AppRouter loggedInUser={props.loggedInUser} />} />
    </Switch>
}

export default withRouter(SessionRouter);
