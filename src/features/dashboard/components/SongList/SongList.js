import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { SongListItem } from '../SongListItem/SongListItem';

const StyledSongList = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding-bottom: ${props => props.theme.margin.s}px;
  padding-top: ${props => props.theme.margin.s}px;
`;

export class SongList extends React.Component {
	static propTypes = {
		onDelete: PropTypes.func,
		onOpen: PropTypes.func,
    songs: PropTypes.object,
	};

	render() {
		return (
			<StyledSongList>
				{Object.values(this.props.songs).map(song => (
					<SongListItem
						key={song.id}
						onDelete={this.props.onDelete}
						onOpen={this.props.onOpen}
            song={song}
          />
				))}
			</StyledSongList>
		);
	}
}
