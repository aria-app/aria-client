import classnames from 'classnames';
import isEqual from 'lodash/fp/isEqual';
import PropTypes from 'prop-types';
import React from 'react';
import { MatrixBoxDot } from './MatrixBoxDot';
import { MatrixBoxSmallCross } from './MatrixBoxSmallCross';
import './MatrixBox.scss';

export class MatrixBox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    fill: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    style: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.height !== this.props.height ||
      nextProps.width !== this.props.width ||
      !isEqual(nextProps.matrix, this.props.matrix)
    );
  }

  render() {
    const height = this.props.height + 4;
    const width = this.props.width + 4;

    return (
      <div
        className={this.getClassName()}
        style={this.props.style}>
        <svg
          height={height}
          style={{
            marginLeft: -1,
            marginRight: -1,
            marginTop: -1,
            marginBottom: -1,
          }}
          width={width}
          viewBox={`0 0 ${width} ${height}`}
          dangerouslySetInnerHTML={{
            __html: this.getData(),
          }}
        />
      </div>
    );
  }

  getClassName = () =>
    classnames('matrix-box', this.props.className);

  getData = () => {
    const rowCount = this.props.matrix.length;
    let data = '';

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const row = this.props.matrix[rowIndex];
      const columnCount = row.length;
      for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const nodeType = row[columnIndex];
        const nodeData = this.getNodeData(
          nodeType,
          rowIndex,
          rowCount,
          columnIndex,
          columnCount,
        );
        data = data + ' ' + nodeData;
      }
    }
    // console.log('all data', data);

    return data;
  };

  getNodeData = (nodeType, rowIndex, rowCount, columnIndex, columnCount) => {

    const height = this.props.height;
    const width = this.props.width;
    const left = columnIndex * (width / (columnCount - 1));
    const top = rowIndex * (height / (rowCount - 1));

    if (nodeType === 1) {
      return `<path d="M ${left + 1},${top + 1} l1,0 l0,1 l-1,0 l0,-1" fill="${this.props.fill}"/>`;
    }

    if (nodeType === 2) {
      return `<path d="M ${left},${top + 1} l1,0 l0,-1 l1,0 l0,1 l1,0 l0,1 l-1,0 l0,1 l-1,0 l0,-1 l-1,0 l0,-1" fill="${this.props.fill}"/>`;
    }

    return '';
  };

  getNodeComponent = (type) => {
    if (type === 1) {
      return MatrixBoxDot;
    }

    if (type === 2) {
      return MatrixBoxSmallCross;
    }

    return 'div';
  };

  getNode = (rowIndex, columnIndex, component) => {

    const height = this.props.height || 0;
    const width = this.props.width || 0;
    const rowCount = this.props.matrix.length;
    const columnCount = this.props.matrix[0].length;
    const left = columnIndex * (width / (columnCount - 1));
    const top = rowIndex * (height / (rowCount - 1));

    return React.createElement(component, {
      key: `${rowIndex}:${columnIndex}`,
      style: {
        backgroundColor: this.props.fill,
        opacity: 0.5,
        transform: `translate(${left > 0 ? left - 1 : left}px, ${top > 0 ? top - 1 : top}px)`,
      },
    });
  };
}
