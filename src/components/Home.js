import React from 'react';
import Spinner from './Spinner';
import { getPosts } from '../services/api';

export default class Home extends React.Component {
  state = {
    posts: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    getPosts()
      .then(posts => this.setState({ posts, loading: false }))
      .catch(() => this.setState({ error: 'There was an error loading posts', loading: false }));
  }

  render() {
    const { posts, loading, error } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {error}
        {posts.map(post => (
          <div key={post.id} className="App-post">
            <h1>{post.title}</h1>
            <section dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        ))}
      </div>
    );
  }
}
