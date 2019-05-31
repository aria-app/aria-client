import PropTypes from 'prop-types';
import React from 'react';
import styled from '@material-ui/styles/styled';
import withTheme from '@material-ui/styles/withTheme';
import { getExtraProps } from '../helpers/getExtraProps';
import icons from './icons';

const IconContent = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flex: '0 0 auto',
  height: 24,
  justifyContent: 'center',
  width: 24,
});

const StyledIcon = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flex: '0 0 auto',
  height: 40,
  justifyContent: 'center',
  width: 40,
});

class Icon extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    icon: PropTypes.oneOf(Object.keys(icons).concat([''])),
    size: PropTypes.oneOf(['small', 'regular', 'large', '']),
    theme: PropTypes.object,
  };

  render() {
    return (
      <StyledIcon color={this.props.color} {...getExtraProps(this)}>
        <IconContent>{this.getIcon()}</IconContent>
      </StyledIcon>
    );
  }

  getIcon(theme) {
    const color =
      this.props.color ||
      (this.props.theme && this.props.theme.palette.text.primary);
    const iconComponent = icons[this.props.icon];

    if (!iconComponent) return null;

    return React.createElement(iconComponent, {
      color,
      size: this.getSizePixels(),
    });
  }

  getSizePixels() {
    switch (this.props.size) {
      case 'large':
        return 24;
      case 'small':
        return 12;
      default:
        return 20;
    }
  }
}

export default withTheme(Icon);
