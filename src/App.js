import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.posts.length }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/site/posts');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const { response } = this.state;

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Hursley Fit52</h1>
            <h1>{response}</h1>
          </header>
          <div>
            <Route exact path="/" component={() => <h1>HOME</h1>} />
            <Route exact path="/hello" component={() => <h1>HELLO</h1>} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
