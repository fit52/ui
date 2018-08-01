import React from 'react';

import api from '../services/api';

export default class Home extends React.Component {
  state = {
    posts: [],
    loading: true,
  };

  componentDidMount() {
    api.getPosts()
      .then(posts => this.setState({ posts, loading: false }))
      .catch(err => console.err(err));
  }

  render() {
    const { posts, loading } = this.state;

    return (
      <div>
        {loading && 'loading...'}
        {posts.map(post => (
          <div key={post.id} className="App-post">
            <h3>{post.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        ))}
      </div>
    );
  }
}
