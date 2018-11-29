import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../Button/Button';

export const DownloadButton = styled(Button).attrs({
  as: 'a',
  download: props => props.filename,
  href: props => `data:text/json;charset=utf-8,${encodeURIComponent(props.fileContents)}`,
})`
  text-decoration: none;
  -webkit-user-drag: none;
`;

DownloadButton.propTypes = {
  fileContents: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
};
