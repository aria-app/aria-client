import classnames from 'classnames';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { getExtraProps } from '../helpers';

const styles = {
  root: {
    display: 'flex',
    flex: '1 0 auto',
    position: 'relative',
  },
};

class MatrixBox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    fill: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.height !== this.props.height ||
      nextProps.width !== this.props.width
    );
  }

  render() {
    const height = this.props.height + 3;
    const width = this.props.width + 3;

    return (
      <div
        className={classnames(this.props.classes.root, this.props.className)}
        {...getExtraProps(this)}
      >
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

  getData = () => {
    const rowCount = this.props.matrix.length;
    let data = '<path d="';

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const row = this.props.matrix[rowIndex];
      const columnCount = row.length;
      const top = rowIndex * (this.props.height / (rowCount - 1));
      for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const nodeType = row[columnIndex];
        const left = columnIndex * (this.props.width / (columnCount - 1));
        const nodeData = this.getNodeData(nodeType, left, top);
        data = data + nodeData;
      }
    }

    data = data + `" fill="${this.props.fill}"/>`;

    return data;
  };

  getNodeData = (nodeType, left, top) => {
    if (nodeType === 1) {
      return `M ${left + 1},${top + 1} l1,0 l0,1 l-1,0 l0,-1`;
    }

    if (nodeType === 2) {
      return `M ${left},${top +
        1} l1,0 l0,-1 l1,0 l0,1 l1,0 l0,1 l-1,0 l0,1 l-1,0 l0,-1 l-1,0 l0,-1`;
    }

    return '';
  };
}

export default withStyles(styles)(MatrixBox);
