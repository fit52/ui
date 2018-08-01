import React from 'react';

import api from '../services/api';

export default class Home extends React.Component {
  state = {
    posts: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    api.getPosts()
      .then(posts => this.setState({ posts, loading: false }))
      .catch(() => this.setState({ error: 'There was an error loading posts', loading: false }));
  }

  render() {
    const { posts, loading, error } = this.state;

    return (
      <div>
        {loading && 'loading...'}
        {error}
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
