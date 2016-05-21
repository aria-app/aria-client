import React from 'react';
import { findDOMNode } from 'react-dom';
import createHelper from 'recompose/createHelper';
import createElement from 'recompose/createElement';
import { createEagerFactory } from 'recompose';

export const getElementRef = createHelper(() => BaseComponent =>
  React.createClass({
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
      return createElement(BaseComponent, {
        ...this.props,
        ref: 0,
        elementRef: this.state.childRef,
      });
    },
  })
, 'getElementRef');

export const getChildRef = createHelper((selector) => BaseComponent =>
  React.createClass({
    getInitialState() {
      return {
        childRef: undefined,
      };
    },
    componentDidMount() {
      this.setState({
        childRef: findDOMNode(this.refs[0]).querySelector(selector),
      });
    },
    render() {
      return createElement(BaseComponent, {
        ...this.props,
        ref: 0,
        childRef: this.state.childRef,
      });
    },
  })
, 'getChildRef');

export const scrollTo = createHelper((props) => BaseComponent =>
  React.createClass({
    getInitialState() {
      return {
        childRef: undefined,
      };
    },
    componentDidMount() {
      this.target = props.selector
        ? findDOMNode(this.refs[0]).querySelector(props.selector)
        : findDOMNode(this.refs[0]);

      if (props.scrollTop === 'center') {
        this.target.scrollTop = getCenteredScroll(this.target);
      } else {
        this.target.scrollTop = props.scrollTop;
      }

      this.target.addEventListener('scroll', (e) => {
        props.onScroll(this.props, e.target.scrollTop);
      });
    },
    render() {
      return createElement(BaseComponent, {
        ...this.props,
        ref: 0,
      });
    },
    // componentWillUpdate(nextProps) {
    //   const propsChanged = !_.isEqual(nextProps.offset, props.offset)
    //     || !_.isEqual(nextProps.center, props.center);
    //
    //   if (!propsChanged) return;
    //
    //   if (nextProps.center) {
    //     this.child.scrollTop = getCenteredScroll(this.child);
    //   } else {
    //     this.child.scrollTop = nextProps.offset;
    //   }
    // },
  })
, 'scrollTo');

function getCenteredScroll(el) {
  return (el.scrollHeight / 2) - el.offsetHeight / 2;
}
