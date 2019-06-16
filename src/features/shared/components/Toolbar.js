import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { getExtraProps } from '../helpers';

const styles = theme => ({
  root: {
    alignItems: 'stretch',
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
    display: 'flex',
    flex: '0 0 auto',
    height: 56,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    position: 'relative',
  },
  leftItems: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
  },
  rightItems: {
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 auto',
    marginLeft: 'auto',
  },
});

class Toolbar extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    isAlternate: PropTypes.bool,
    leftItems: PropTypes.node,
    leftItemsAlt: PropTypes.node,
    rightItems: PropTypes.node,
    rightItemsAlt: PropTypes.node,
  };

  static defaultProps = {
    leftItems: [],
    leftItemsAlt: [],
    rightItems: [],
    rightItemsAlt: [],
  };

  render() {
    return (
      <div
        className={classnames(this.props.classes.root, this.props.className)}
        {...getExtraProps(this)}
      >
        <div className={this.props.classes.leftItems}>
          {this.getLeftItems()}
        </div>
        <div className={this.props.classes.rightItems}>
          {this.getRightItems()}
        </div>
      </div>
    );
  }

  getLeftItems() {
    return this.props.isAlternate
      ? this.props.leftItemsAlt
      : this.props.leftItems;
  }

  getRightItems() {
    return this.props.isAlternate
      ? this.props.rightItemsAlt
      : this.props.rightItems;
  }
}

export default withStyles(styles)(Toolbar);
