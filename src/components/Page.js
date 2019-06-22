import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import HeaderImage from './HeaderImage';

import { getPage } from '../services/api';

const Page = ({ pageTitle, onPageNotFound }) => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPage(pageTitle).then(pageData => {
      if (pageData) {
        setPage(pageData);
        setLoading(false);
      } else {
        onPageNotFound();
      }
    });
  }, [pageTitle]);

  return (
    <div>
      <Spinner loading={loading} />
      {page && (
        <div className="App-post App-page wp-content">
          {page.pictureUrl && <HeaderImage imageUrl={page.pictureUrl} />}
          <h1>{page.title}</h1>
          <section dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      )}
    </div>
  );
};

Page.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  onPageNotFound: PropTypes.func.isRequired,
};

export default Page;
