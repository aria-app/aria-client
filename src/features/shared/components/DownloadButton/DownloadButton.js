import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import './DownloadButton.scss';

export class DownloadButton extends React.PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }

  render() {
    return h('a.download-button', {
      download: this.props.filename,
      href: getHref(this.props.content),
    }, [
      this.props.text,
    ]);
  }
}

function getHref(content) {
  const uri = encodeURIComponent(content);
  const data = `text/json;charset=utf-8,${uri}`;
  return `data:${data}`;
}
