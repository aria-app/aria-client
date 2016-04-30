import React from 'react';
import _ from 'lodash';
import { findDOMNode } from 'react-dom';
// import h from 'react-hyperscript';

const classified = React.createClass({
  propTypes: {
    centered: React.PropTypes.bool,
    offset: React.PropTypes.number,
  },
  componentDidMount() {
    this.child = findDOMNode(this.refs[0]);

    if (this.props.centered) {
      this.child.scrollTop = getCenteredScroll(this.child);
    } else {
      this.child.scrollTop = this.props.offset;
    }
  },
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.offset, this.props.offset);
  },
  componentWillUpdate(nextProps) {
    if (nextProps.centered) {
      this.child.scrollTop = getCenteredScroll(this.child);
    } else {
      this.child.scrollTop = nextProps.offset;
    }
  },
  render() {
    return React.Children.map(this.props.children, (child, index) =>
      React.cloneElement(child, { ref: index })
    )[0];
  },
});

export const ScrollTo = classified;

function getCenteredScroll(el) {
  return (el.scrollHeight / 2) - el.offsetHeight / 2;
}
