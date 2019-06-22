import React from 'react';
import { history as historyType, match as matchType } from 'react-router-prop-types';
import PageComponent from '../components/Page';

const Page = ({ match, history }) => {
  const handlePageNotFound = () => {
    history.replace('/404');
  };

  return <PageComponent pageTitle={match.params.pageTitle} onPageNotFound={handlePageNotFound} />;
};

Page.propTypes = {
  history: historyType.isRequired,
  match: matchType.isRequired,
};

export default Page;
