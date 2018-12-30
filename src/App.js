import React from 'react';
import {
  BrowserRouter as Router, Route, Link, Switch,
} from 'react-router-dom';
import './App.css';

import Home from './App/components/Home';
import Page from './App/components/Page';
import Events from './App/components/Events';
import Event from './App/components/Event';
import Runner from './App/components/Runner';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <div className="App-inner-header">
          <div className="App-image" />
          <h1 className="App-title">Hursley Fit52</h1>
          <p className="App-links">
            <Link to="/">Home</Link>
            <Link to="/page/about">About</Link>
            <Link to="/events">Events</Link>
          </p>
        </div>
      </header>
      <section className="App-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/page/:pageTitle" component={Page} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/events/:eventId" component={Event} />
          <Route exact path="/runners/:runnerId" component={Runner} />
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
