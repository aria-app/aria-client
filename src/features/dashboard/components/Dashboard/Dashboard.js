import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { SongList } from '../SongList/SongList';

const StyledDashboard = styled.div`
  color: white;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

export class Dashboard extends React.Component {
	static propTypes = {
		onLoad: PropTypes.func,
    songs: PropTypes.object,
	};

  componentDidMount() {
    this.props.onLoad();
  }

	render() {
		return (
			<StyledDashboard>
        <SongList
          onOpen={this.openSong}
          songs={this.props.songs}
        />
			</StyledDashboard>
		);
	}

  openSong = (song) => {
    this.props.history.push(`/song/${song.id}`);
  }
}
