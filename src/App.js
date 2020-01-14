import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Spinner } from "@blueprintjs/core";
import { UserContext } from './contexts/user-context';
import './App.scss';

import AppRouter from './routers/AppRouter';
import SessionRouter from './routers/SessionRouter';

const loader = <Spinner />
const storeUser = (user, setLoggedInUser) => {
  localStorage.setItem('loggedUser', JSON.stringify(user));
  setLoggedInUser(user);
}
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localUser = localStorage.getItem('loggedUser');
    if (localUser) {
      if (!loggedInUser || !Object.keys(loggedInUser).length) {
        setLoggedInUser(JSON.parse(localUser));
      }
    }
    setIsLoading(false);
  });
  
  return (
    <div>
      <UserContext.Provider value={loggedInUser}>
        <Suspense fallback={loader}>
          {isLoading ? loader :
            <BrowserRouter>
              <Switch>
                <Route 
                  path={'/app'} 
                  component={() =>
                      <UserContext.Consumer>
                        {context => ( <AppRouter loggedInUser={context} onSignOut={() => storeUser(null, setLoggedInUser)} /> )}
                      </UserContext.Consumer>} />
                <Route 
                  path={'/session'} 
                  component={() =>
                    <UserContext.Consumer>
                      {context => ( <SessionRouter loggedInUser={context} onSignIn={(user) => storeUser(user, setLoggedInUser)} /> )}
                    </UserContext.Consumer>} />
                <Redirect 
                  to={'/app/home'} 
                  component={() => 
                      <UserContext.Consumer>
                      {context => ( <AppRouter loggedInUser={context} onSignOut={() => storeUser(null, setLoggedInUser)} /> )}
                      </UserContext.Consumer> } />
              </Switch>
            </BrowserRouter>}
        </Suspense>
      </UserContext.Provider>
    </div>);
}

export default App;
