import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../Button/Button';

export const DownloadButton = styled(Button).attrs(props => ({
  as: 'a',
  download: props.filename,
  href: `data:text/json;charset=utf-8,${encodeURIComponent(props.fileContents)}`,
}))`
  text-decoration: none;
  -webkit-user-drag: none;
`;

DownloadButton.propTypes = {
  fileContents: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
};
