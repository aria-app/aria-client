import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import shared from '../../../shared';

const { IconButton } = shared.components;
const { mixins } = shared.styles;

const SongListItemDeleteButton = styled(IconButton).attrs(props => ({
  color: props.theme.almostwhite,
}))`
  margin-right: ${props => -props.theme.margin.s}px;
`;

const SongListItemText = styled.div`
  align-items: center;
  align-self: stretch;
  color: white;
  display: flex;
  flex: 1 1 auto;
`;

const StyledSongListItem = styled.div`
  align-items: center;
	cursor: pointer;
  display: flex;
  flex: 0 0 auto;
	height: 48px;
  padding-left: ${props => props.theme.margin.m}px;
  padding-right: ${props => props.theme.margin.m}px;
	position: relative;
	${mixins.interactionOverlay('white')}
`;

export class SongListItem extends React.Component {
	static propTypes = {
		onDelete: PropTypes.func,
		onOpen: PropTypes.func,
    song: PropTypes.object,
	};

	render() {
		return (
			<StyledSongListItem>
        <SongListItemText
  				onClick={this.open}>
          {this.props.song.name}
        </SongListItemText>
        <SongListItemDeleteButton
          icon="close"
          onClick={this.delete}
        />
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
