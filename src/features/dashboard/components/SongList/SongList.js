import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import shared from '../../../shared';

const { mixins } = shared.styles;

const SongListItem = styled.div`
  align-items: center;
  color: white;
	cursor: pointer;
  display: flex;
  flex: 0 0 auto;
	height: 48px;
  padding-left: ${props => props.theme.margin.m}px;
  padding-right: ${props => props.theme.margin.m}px;
	position: relative;
	${mixins.interactionOverlay('white')}
`;

const StyledSongList = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

export class SongList extends React.Component {
	static propTypes = {
		onOpen: PropTypes.func,
    songs: PropTypes.object,
	};

	render() {
		return (
			<StyledSongList>
				{Object.values(this.props.songs).map(song => (
					<SongListItem
						key={song.id}
						onClick={() => this.props.onOpen(song)}>
						{song.name}
					</SongListItem>
				))}
			</StyledSongList>
		);
	}
}
