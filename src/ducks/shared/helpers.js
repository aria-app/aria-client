import _ from 'lodash';
import React from 'react';
import { findDOMNode } from 'react-dom';
import createHelper from 'recompose/createHelper';
import createElement from 'recompose/createElement';
import * as constants from './constants';

export const doOnMount = createHelper((onMountFn) => BaseComponent =>
  React.createClass({
    componentDidMount() {
      onMountFn(this.props);
    },
    render() {
      return createElement(BaseComponent, {
        ...this.props,
      });
    },
  })
, 'doOnMount');

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

export function getId(items) {
  for (let i = 0; i < items.length; i++) {
    const itemHasId = _.some(items, { id: i });
    if (!itemHasId) return i;
  }

  return items.length;
}

export function getIds(items, count) {
  const ids = [];

  for (let i = 0; i < items.length; i++) {
    const idTaken = _.some(items, { id: i })
      || _.includes(ids, i);

    if (!idTaken) ids.push(i);

    if (ids.length === count) return ids;
  }

  return ids.concat(_.range(
    items.length,
    items.length + count - ids.length,
  ));
}

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

export function replaceItemsById(list, items) {
  return list.map(i => {
    const newItem = _.find(items, { id: i.id });
    return newItem || i;
  });
}
