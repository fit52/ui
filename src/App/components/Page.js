import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

import api from '../services/api';

export default class Page extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  state = {
    page: null,
    loading: true,
  };

  componentDidMount() {
    const { location, history } = this.props;
    api.getPage(location.pathname.substr('/page/'.length))
      .then(page => this.setState({ page, loading: false }))
      .catch(() => history.replace('/404'));
  }

  render() {
    const { page, loading } = this.state;

    return (
      <div>
        <Spinner loading={loading} />
        {page && (
          <div className="App-post App-page">
            <h1>{page.title}</h1>
            <section dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        )}
      </div>
    );
  }
}
