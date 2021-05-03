import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './views/home';
import LoginPage from './views/login';
import RegisterPage from './views/register';
import RestaurantPage from './views/restaurant';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route
          path="/restaurant/:restaurantId"
          exact
          component={RestaurantPage}
        />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
