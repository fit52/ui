import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/no-danger */

const HeaderImage = ({ imageUrl }) => {
  if (imageUrl === 'none') return null;
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
            .App .App-banner {
              background-image: url(${imageUrl});
            }
          `,
    }}
    />
  );
};

HeaderImage.propTypes = {
  imageUrl: PropTypes.string,
};

HeaderImage.defaultProps = {
  imageUrl: 'none',
};

export default HeaderImage;
