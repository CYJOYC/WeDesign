import React from "react";
import PropTypes from 'prop-types';

const VersionItem = ({fileName, imageURL, onClick}) => {
  return (
    <div className="version-each">
      <div className="version-name">{fileName}</div>
      <img
        className="version-image"
        src={imageURL}
        onClick={onClick}
      />
    </div>
  );
};

VersionItem.prototype = {
    onClick: PropTypes.func.isRequired,
    fileName: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired
}

export default VersionItem;
