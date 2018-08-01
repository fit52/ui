import React from 'react';

import api from '../services/api';

export default class Page extends React.Component {
  state = {
    page: null,
    loading: true,
  };

  componentDidMount() {
    const { location } = this.props;
    api.getPage(location.pathname.substr('/page/'.length))
      .then(page => this.setState({ page, loading: false }))
      .catch(err => console.err(err));
  }

  render() {
    const { page, loading } = this.state;

    return (
      <div>
        {loading && 'loading...'}
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
