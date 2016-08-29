import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setDisplayName, setPropTypes } from 'recompose';
import './download-button.scss';

const component = props => h('a.download-button', {
  href: props.href,
  download: props.filename,
}, [props.text]);

export const DownloadButton = compose(
  setDisplayName('DownloadButton'),
  pure,
  setPropTypes({
    text: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
  }),
  mapProps(props => ({
    ...props,
    href: getHref(props.content),
  })),
)(component);

function getHref(content) {
  const uriComponent = encodeURIComponent(content);
  const data = `text/json;charset=utf-8,${uriComponent}`;
  return `data:${data}`;
}
