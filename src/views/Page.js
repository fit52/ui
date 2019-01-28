import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../components/Spinner';

import { getPage } from '../services/api';

export default class Page extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  state = {
    page: null,
    loading: true,
  };

  async componentDidMount() {
    const { history, match: { params: { pageTitle } } } = this.props;
    const page = await getPage(pageTitle);
    if (page) {
      this.setState({ page, loading: false });
    } else {
      history.replace('/404');
    }
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
