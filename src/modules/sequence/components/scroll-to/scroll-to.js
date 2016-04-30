import React from 'react';
import _ from 'lodash';
import { findDOMNode } from 'react-dom';
// import h from 'react-hyperscript';

const classified = React.createClass({
  propTypes: {
    center: React.PropTypes.bool,
    offset: React.PropTypes.number,
  },
  componentDidMount() {
    this.child = findDOMNode(this.refs[0]);

    if (this.props.center) {
      this.child.scrollTop = getCenteredScroll(this.child);
    } else {
      this.child.scrollTop = this.props.offset;
    }
  },
  componentWillUpdate(nextProps) {
    const propsChanged = !_.isEqual(nextProps.offset, this.props.offset)
      || !_.isEqual(nextProps.center, this.props.center);

    if (!propsChanged) return;

    if (nextProps.center) {
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
