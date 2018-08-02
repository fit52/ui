import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

import Home from './App/components/Home';
import Page from './App/components/Page';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Hursley Fit52</h1>
        <p className="App-links">
          <Link to="/">Home</Link>
          <Link to="/page/about">About</Link>
        </p>
      </header>
      <section className="App-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/page/:pageTitle" component={Page} />
          <Route exact>
            <React.Fragment>
              <h1>Page not found</h1>
              <p><Link to="/">Return Home</Link></p>
            </React.Fragment>
          </Route>
        </Switch>
      </section>
    </div>
  </Router>
);

export default App;
