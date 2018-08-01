import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
        <Route exact path="/" component={Home} />
        <Route exact path="/page/:pageTitle" component={Page} />
      </section>
    </div>
  </Router>
);

export default App;
