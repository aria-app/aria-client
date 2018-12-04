import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeConsumer } from 'styled-components';
import icons from './icons';

const IconContent = styled.div`
  align-items: center;
  display: flex;
  height: 24px;
  justify-content: center;
  width: 24px;
`;

const StyledIcon = styled.div`
  align-items: center;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 40px;
`;

export class Icon extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    icon: PropTypes.oneOf(Object.keys(icons).concat([''])),
    size: PropTypes.oneOf(['small', 'regular', 'large', '']),
  }

  render() {
    return (
      <ThemeConsumer>
        {theme => (
          <StyledIcon
            color={this.props.color}>
            <IconContent>
              {this.getIcon(theme)}
            </IconContent>
          </StyledIcon>
        )}
      </ThemeConsumer>
    );
  }

  getClassName = () =>
    classnames('icon', this.props.className);

  getIcon(theme) {
    const iconComponent = icons[this.props.icon];

    if (!iconComponent) return null;

    return React.createElement(iconComponent, {
      color: this.props.color || theme.color,
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
