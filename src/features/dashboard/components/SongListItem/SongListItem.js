import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";
import shared from "../../../shared";

const { IconButton } = shared.components;

const SongListItemDeleteButton = styled(IconButton).attrs(props => ({
  color: props.theme.almostwhite
}))(props => ({
  marginRight: props.theme.margin.s * -1
}));

const SongListItemText = styled.div({
  alignItems: "center",
  alignSelf: "stretch",
  color: "white",
  display: "flex",
  flex: "1 1 auto"
});

const StyledSongListItem = styled.div(props => ({
  alignItems: "center",
  cursor: "pointer",
  display: "flex",
  flex: "0 0 auto",
  height: 48,
  paddingLeft: props.theme.margin.m,
  paddingRight: props.theme.margin.m,
  position: "relative"
  // TODO: ${mixins.interactionOverlay('white')}
}));

export class SongListItem extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func,
    onOpen: PropTypes.func,
    song: PropTypes.object
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
