import React from 'react';
import PropTypes from 'prop-types';
import { PulseLoader } from 'react-spinners';

import './spinner.css';

export default function Spinner({ loading }) {
  return (
    <div className="Spinner">
      <PulseLoader
        color="#3C6E71"
        loading={loading}
      />
    </div>
  );
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};
