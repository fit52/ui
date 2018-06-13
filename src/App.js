import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ posts: res.posts }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/site/posts');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const { posts } = this.state;

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Hursley Fit52</h1>
          </header>
          <section className="App-content">
            <Route exact path="/" component={() => <h1>HOME</h1>} />
            <Route exact path="/hello" component={() => <h1>HELLO</h1>} />

            { posts.map(post => (
              <div key={post.ID} className="App-post">
                <h3>{post.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
              </div>
            ))}
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
