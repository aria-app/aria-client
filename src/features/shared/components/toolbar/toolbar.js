import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import classnames from 'classnames';
import './toolbar.scss';

export class Toolbar extends React.Component {
  static propTypes = {
    alternateLeftItems: React.PropTypes.node,
    alternateRightItems: React.PropTypes.node,
    className: React.PropTypes.string,
    isAlternate: React.PropTypes.bool,
    leftItems: React.PropTypes.node,
    position: React.PropTypes.oneOf(['bottom', 'top']),
    rightItems: React.PropTypes.node,
    style: StylePropType,
  }

  static defaultProps = {
    alternateLeftItems: [],
    alternateRightItems: [],
    leftItems: [],
    rightItems: [],
  }

  render() {
    return h('.toolbar', {
      className: this.getClassName(),
      style: this.props.style,
    }, [
      h('.toolbar__left', {}, this.getLeftItems()),
      h('.toolbar__right', {}, this.getRightItems()),
    ]);
  }

  getClassName() {
    return classnames({
      'toolbar--bottom': this.props.position === 'bottom',
      'toolbar--top': this.props.position !== 'bottom',
      'toolbar--alternate': this.props.isAlternate,
    }, this.props.className);
  }

  getLeftItems() {
    return this.props.isAlternate
      ? this.props.alternateLeftItems
      : this.props.leftItems;
  }

  getRightItems() {
    return this.props.isAlternate
      ? this.props.alternateRightItems
      : this.props.rightItems;
  }
}
