import React from 'react';

import { getPosts } from '../services/api';

export default class Home extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
    getPosts()
      .then(posts => this.setState({ posts }))
      .catch(err => console.err(err));
  }

  render() {
    const { posts } = this.state;

    return (
      <div>
        { posts.map(post => (
          <div key={post.id} className="App-post">
            <h3>{post.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
          </div>
        ))}
      </div>
    );
  }
}