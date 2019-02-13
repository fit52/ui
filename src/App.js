import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Link, NavLink,
} from 'react-router-dom';
import './App.scss';

import Home from './views/Home';
import Page from './views/Page';
import Events from './views/Events';
import Event from './views/Event';
import Runner from './views/Runner';
import Records from './views/Records';

const linkProps = {
  className: 'bx--link',
  activeClassName: 'bx--tabs__nav-item--selected',
};

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <div className="App-inner-header">
          <div className="App-image" />
          <nav className="App-links">
            <NavLink {...linkProps} exact to="/">Home</NavLink>
            <NavLink {...linkProps} to="/page/about">About</NavLink>
            <NavLink {...linkProps} to="/events">Events</NavLink>
            <NavLink {...linkProps} to="/records">Records</NavLink>
          </nav>
        </div>
      </header>
      <div className="App-banner" />
      <div className="App-body">
        <section className="App-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/page/:pageTitle" component={Page} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/records" component={Records} />
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
      <footer className="App-footer">
        <div className="App-inner-footer">
          <span>Copyright Andrew Daniel 2019. Photo by Tomasz Woźniak on Unsplash</span>
        </div>
      </footer>
    </div>
  </Router>
);

export default App;
