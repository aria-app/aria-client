import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import shared from '../../shared';

const { IconButton } = shared.components;

const styles = theme => ({
  root: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    height: 48,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    position: 'relative',
  },
  text: {
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flex: '1 1 auto',
  },
  deleteButton: {
    marginRight: theme.spacing(-1),
  },
});

class SongListItem extends React.PureComponent {
  static propTypes = {
    onDelete: PropTypes.func,
    onOpen: PropTypes.func,
    song: PropTypes.object,
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.text} onClick={this.open}>
          {this.props.song.name}
        </div>
        <IconButton
          className={this.props.classes.deleteButton}
          icon="close"
          onClick={this.delete}
        />
      </div>
    );
  }

  delete = () => {
    this.props.onDelete(this.props.song);
  };

  open = () => {
    this.props.onOpen(this.props.song);
  };
}

export default withStyles(styles)(SongListItem);
