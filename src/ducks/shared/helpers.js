import _ from 'lodash';
import React from 'react';
import { findDOMNode } from 'react-dom';
import createHelper from 'recompose/createHelper';
import { createEagerElement } from 'recompose';
import * as constants from './constants';

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
      return createEagerElement(BaseComponent, {
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
      return createEagerElement(BaseComponent, {
        ...this.props,
        ref: 0,
        childRef: this.state.childRef,
      });
    },
  })
, 'getChildRef');

export function getNoteName(y) {
  const octaveNumber = ((constants.octaveRange.length - 1) - Math.floor(y / 12));
  const letter = getLetter(y);
  return `${letter}${octaveNumber}`;
}

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
    },
    render() {
      return createEagerElement(BaseComponent, {
        ...this.props,
        ref: 0,
      });
    },
  })
, 'scrollTo');

function getCenteredScroll(el) {
  return (el.scrollHeight / 2) - el.offsetHeight / 2;
}

function getLetter(point) {
  return [
    'B',
    'A#',
    'A',
    'G#',
    'G',
    'F#',
    'F',
    'E',
    'D#',
    'D',
    'C#',
    'C',
  ][point % 12];
}

export function getScale() {
  return _(constants.octaveRange)
  .flatMap(octave => _.range(12).map(step => {
    const y = (octave * 12) + step;
    return {
      name: getNoteName(y),
      y,
    };
  }))
  .value();
}

export function resolveOnMouseUp() {
  return new Promise(resolve => {
    window.addEventListener('mouseup', doResolve, false);
    function doResolve() {
      window.removeEventListener('mouseup', doResolve, false);
      resolve();
    }
  });
}

export function replaceItemsById(list, items) {
  return list.map(i => {
    const newItem = _.find(items, { id: i.id });
    return newItem || i;
  });
}

export function setAtIds(array, obj) {
  return array.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), obj);
}
