import PropTypes from 'prop-types';
import React from 'react';
import styled from '@material-ui/styles/styled';
import shared from '../../shared';

const { IconButton } = shared.components;

const SongListItemDeleteButton = styled(IconButton)(props => ({
  marginRight: props.theme.spacing(-1),
}));

const SongListItemText = styled('div')({
  alignItems: 'center',
  alignSelf: 'stretch',
  display: 'flex',
  flex: '1 1 auto',
});

const StyledSongListItem = styled('div')(props => ({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  flex: '0 0 auto',
  height: 48,
  paddingLeft: props.theme.spacing(2),
  paddingRight: props.theme.spacing(2),
  position: 'relative',
}));

export default class SongListItem extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func,
    onOpen: PropTypes.func,
    song: PropTypes.object,
  };

  render() {
    return (
      <StyledSongListItem>
        <SongListItemText onClick={this.open}>
          {this.props.song.name}
        </SongListItemText>
        <SongListItemDeleteButton icon="close" onClick={this.delete} />
      </StyledSongListItem>
    );
  }

  delete = () => {
    this.props.onDelete(this.props.song);
  };

  open = () => {
    this.props.onOpen(this.props.song);
  };
}
