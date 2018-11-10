import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import './Toolbar.scss';

export class Toolbar extends React.PureComponent {
  static propTypes = {
    alternateLeftItems: PropTypes.node,
    alternateRightItems: PropTypes.node,
    className: PropTypes.string,
    isAlternate: PropTypes.bool,
    leftItems: PropTypes.node,
    position: PropTypes.oneOf(['bottom', 'top']),
    rightItems: PropTypes.node,
    style: PropTypes.object,
  }

  static defaultProps = {
    alternateLeftItems: [],
    alternateRightItems: [],
    leftItems: [],
    rightItems: [],
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        style={this.props.style}>
        <div
          className="toolbar__left">
          {this.getLeftItems()}
        </div>
        <div
          className="toolbar__right">
          {this.getRightItems()}
        </div>
      </div>
    );
  }

  getClassName() {
    return classnames('toolbar', {
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
