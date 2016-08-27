import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import { Button } from '../button/button';
import './download-button.scss';

const component = props => h(Button, {
  className: 'download-button',
  text: props.buttonText,
  onPress: props.download(),
});

export const DownloadButton = compose(
  setDisplayName('DownloadButton'),
  pure,
  setPropTypes({
    buttonText: PropTypes.string,
    content: PropTypes.string,
    filename: PropTypes.string,
  }),
  withHandlers({
    download: props => () => {
      console.log(props.content);
    },
  }),
)(component);
