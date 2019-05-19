import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';

DownloadButton.propTypes = {
  fileContents: PropTypes.string,
  filename: PropTypes.string,
};

export default function DownloadButton({ filename, fileContents, ...rest }) {
  return (
    <Button
      download={filename}
      href={`data:text/json;charset=utf-8,${encodeURIComponent(fileContents)}`}
      {...rest}
    />
  );
}
