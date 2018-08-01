import React from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';

export default class Page extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  state = {
    page: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    const { location } = this.props;
    api.getPage(location.pathname.substr('/page/'.length))
      .then(page => this.setState({ page, loading: false }))
      .catch(() => this.setState({ error: '404 page not found', loading: false }));
  }

  render() {
    const { page, loading, error } = this.state;

    return (
      <div>
        {loading && 'loading...'}
        {error}
        {page && (
          <div className="App-post">
            <h3>{page.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        )}
      </div>
    );
  }
}
