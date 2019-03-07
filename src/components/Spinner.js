import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';

export default function Spinner({ loading }) {
  return (
    <div className="Spinner">
      <Loading active={loading} />
    </div>
  );
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};
