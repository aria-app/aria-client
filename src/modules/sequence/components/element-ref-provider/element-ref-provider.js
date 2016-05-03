import React from 'react';
import { findDOMNode } from 'react-dom';

const classified = React.createClass({
  getInitialState() {
    return {
      childRef: undefined,
    };
  },
  componentDidMount() {
    this.setState({
      childRef: findDOMNode(this.refs[0]),
    });
  },
  render() {
    return React.Children.map(this.props.children, (child, index) =>
      React.cloneElement(child, {
        ref: index,
        elementRef: this.state.childRef,
      })
    )[0];
  },
});

export const ElementRefProvider = classified;
