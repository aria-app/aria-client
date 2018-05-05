import flatten from 'lodash/fp/flatten';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { MatrixBoxDot } from './MatrixBoxDot';
import { MatrixBoxSmallCross } from './MatrixBoxSmallCross';
import './MatrixBox.scss';

export class MatrixBox extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    fill: PropTypes.string,
    matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    style: PropTypes.object,
  };

  render() {
    return h('.matrix-box', {
      className: this.props.className,
      ref: this.setRef,
      style: this.props.style,
    }, [
      ...flatten(this.props.matrix.map((row, rowIndex) =>
        row.map((type, columnIndex) =>
          this.getNode(
            rowIndex,
            columnIndex,
            this.getNodeComponent(type),
          ),
        ),
      )),
      h('.matrix-box__content', [
        this.props.children,
      ]),
    ]);
  }

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
    if (!this.ref) return null;

    const height = this.ref.offsetHeight;
    const width = this.ref.offsetWidth;
    const rowCount = this.props.matrix.length;
    const columnCount = this.props.matrix[0].length;
    const left = columnIndex * (width / (columnCount - 1));
    const top = rowIndex * (height / (rowCount - 1));

    return h(component, {
      key: `${rowIndex}:${columnIndex}`,
      style: {
        backgroundColor: this.props.fill,
        opacity: 0.5,
        transform: `translate(${left > 0 ? left - 1 : left}px, ${top > 0 ? top - 1 : top}px)`,
      },
    });
  };

  setRef = (ref) => {
    this.ref = ref;
    this.forceUpdate();
  };
}
