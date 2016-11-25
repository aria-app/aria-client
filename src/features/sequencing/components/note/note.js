import _ from 'lodash';
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

  render() {
    return h('.note', {
      className: this.getClassName(),
      style: {
        transform: this.getTransform(),
      },
    }, [
      h('.note__point', {
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
      }, [
        h('.note__point__fill'),
      ]),
      h('.note__point-connector', {
        style: {
          transform: this.getConnectorTransform(),
        },
      }),
      h('.note__point', {
        style: {
          display: this.getEndPointDisplay(),
          transform: this.getEndPointTransform(),
        },
        onMouseDown: this.handleEndpointMouseDown,
      }, [
        h('.note__point__fill'),
      ]),
    ]);
  }

  getClassName() {
    return classnames({
      'note--active': this.props.isSelected,
    }, this.props.className);
  }

  getConnectorTransform() {
    const startPoint = _.first(this.props.note.points);
    const endPoint = _.last(this.props.note.points);
    const { asin, abs, PI, sign, sqrt } = Math;
    const x = ((endPoint.x - startPoint.x) * 40);
    const y = (endPoint.y - startPoint.y) * 40;
    const length = x !== 0
      ? sqrt(abs((x ** 2) + (y ** 2)))
      : 0;
    const rotation = x !== 0
      ? asin(abs(y / length)) * (180 / PI) * sign(y)
      : 0;
    return `rotate(${rotation}deg) scaleX(${x ? length : 0})`;
  }

  getEndPointDisplay() {
    return is32ndNote(this.props.note) === 0 ? 'none' : 'flex';
  }

  getEndPointTransform() {
    const startPoint = _.first(this.props.note.points);
    const endPoint = _.last(this.props.note.points);
    const x = (endPoint.x - startPoint.x) * 40;
    const y = (endPoint.y - startPoint.y) * 40;
    return `translate(${x}px, ${y}px)`;
  }

  getTransform() {
    const { x, y } = _.first(this.props.note.points);
    return `translate(${x * 40}px, ${y * 40}px)`;
  }

  handleEndpointMouseDown = (e) => {
    if (!this.props.onEndpointMouseDown) return;
    this.props.onEndpointMouseDown(this.props.note, e);
  }

  handleMouseDown = (e) => {
    if (!this.props.onMouseDown) return;
    this.props.onMouseDown(this.props.note, e);
  }

  handleMouseUp = (e) => {
    if (!this.props.onMouseUp) return;
    this.props.onMouseUp(this.props.note, e);
  }
}

function is32ndNote(note) {
  return _.last(note.points).x - _.first(note.points).x;
}
