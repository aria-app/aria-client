import { first, last } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import './note.scss';

export class Note extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    isSelected: React.PropTypes.bool.isRequired,
    note: React.PropTypes.object.isRequired,
    onEndpointMouseDown: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
  }

  static defaultProps = {
    isSelected: false,
  }

  render() {
    return h('.note', {
      className: this.getClassName(),
      style: this.getStyle(),
    }, [
      h('.note__point.note__point--start', {
        onMouseDown: this.handleStartPointMouseDown,
        onMouseUp: this.handleStartPointMouseUp,
      }, [
        h('.note__point__fill.note__point__fill--start'),
      ]),
      h('.note__point-connector', {
        style: this.getConnectorStyle(),
      }),
      h('.note__point.note__point--end', {
        onMouseDown: this.handleEndPointMouseDown,
        style: this.getEndPointStyle(),
      }, [
        h('.note__point__fill.note__point__fill--end'),
      ]),
    ]);
  }

  getClassName() {
    return classnames({
      'note--active': this.props.isSelected,
    }, this.props.className);
  }

  getConnectorStyle() {
    const startPoint = first(this.props.note.points);
    const endPoint = last(this.props.note.points);
    const { asin, abs, PI, sign, sqrt } = Math;
    const x = ((endPoint.x - startPoint.x) * 40);
    const y = (endPoint.y - startPoint.y) * 40;
    const scale = x !== 0
      ? sqrt(abs((x ** 2) + (y ** 2)))
      : 0;
    const rotation = x !== 0
      ? asin(abs(y / scale)) * (180 / PI) * sign(y)
      : 0;
    return {
      transform: `rotate(${rotation}deg) scaleX(${scale})`,
    };
  }

  getEndPointStyle() {
    const startPoint = first(this.props.note.points);
    const endPoint = last(this.props.note.points);
    const x = (endPoint.x - startPoint.x) * 40;
    const y = (endPoint.y - startPoint.y) * 40;
    return {
      display: is32ndNote(this.props.note) ? 'none' : 'flex',
      transform: `translate(${x}px, ${y}px)`,
    };
  }

  getStyle() {
    const { x, y } = first(this.props.note.points);
    return {
      transform: `translate(${x * 40}px, ${y * 40}px)`,
    };
  }

  handleEndPointMouseDown = (e) => {
    if (!this.props.onEndpointMouseDown) return;
    this.props.onEndpointMouseDown(this.props.note, e);
  }

  handleStartPointMouseDown = (e) => {
    if (!this.props.onMouseDown) return;
    this.props.onMouseDown(this.props.note, e);
  }

  handleStartPointMouseUp = (e) => {
    if (!this.props.onMouseUp) return;
    this.props.onMouseUp(this.props.note, e);
  }
}

function is32ndNote(note) {
  const length = last(note.points).x - first(note.points).x;
  return length === 0;
}
