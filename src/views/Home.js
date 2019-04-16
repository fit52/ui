import React from 'react';
import Spinner from '../components/Spinner';
import HeaderImage from '../components/HeaderImage';
import { getPage } from '../services/api';

export default class Home extends React.Component {
  state = {
    page: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    getPage('home')
      .then(page => this.setState({ page, loading: false }))
      .catch(() => this.setState({ error: 'There was an error loading posts', loading: false }));
  }

  render() {
    const { page, loading, error } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {error}
        {page && (
          <div className="App-post App-page wp-content">
            <HeaderImage imageUrl={page.pictureUrl} />
            <h1>{page.title}</h1>
            <section dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        )}
      </div>
    );
  }
}
