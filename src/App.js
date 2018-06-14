import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './App/components/home';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Hursley Fit52</h1>
            <p className="App-links">
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
            </p>
          </header>
          <section className="App-content">
            <Route exact path="/" component={Home} />
            <Route exact path="/hello" component={() => <h1>HELLO</h1>} />
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
