import React from 'react';
import { findDOMNode } from 'react-dom';
import createHelper from 'recompose/createHelper';
import createElement from 'recompose/createElement';

export const getElementRef = createHelper(() => BaseComponent =>
  React.createClass({
    getInitialState() {
      return {
        childRef: undefined,
      };
    },
    componentDidMount() {
      debugger;
      // console.log(this.refs[0]);
      this.setState({
        childRef: findDOMNode(this.refs[0]),
      });
    },
    render() {
      return createElement(BaseComponent, {
        ...this.props,
        ref: 0,
        elementRef: this.state.childRef,
      });
    },
  })
, 'getElementRef');
