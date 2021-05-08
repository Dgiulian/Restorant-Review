import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import CreateRestaurantPage from './views/create';
import HomePage from './views/home';
import LoginPage from './views/login';
import RegisterPage from './views/register';
import RestaurantPage from './views/restaurant';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <PrivateRoute path="/create" exact component={CreateRestaurantPage} />
        <Route
          path="/restaurant/:restaurantId"
          exact
          component={RestaurantPage}
        />
        <Route path="/" exact component={HomePage} />
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  );
}

export default App;
