import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import shared from '../../../shared';
import { SongList } from '../SongList/SongList';

const { Icon, Toolbar } = shared.components;
const { mixins } = shared.styles;

const DashboardCenteredContent = styled.div`
  align-self: center;
  max-width: ${props => props.theme.minWidthWidescreen}px;
  width: 100%;
`;

const DashboardUserImage = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

const DashboardUserInfo = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  height: 100%;
`;

const Fab = styled.div`
  align-items: center;
  background-color: ${props => props.theme.almostwhite};
  border-radius: 50%;
  bottom: 24px;
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  height: 56px;
  justify-content: center;
  position: absolute;
  right: 24px;
  width: 56px;
  ${mixins.interactionOverlay('black')}
`;

const StyledDashboard = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  position: relative;
`;

export class Dashboard extends React.Component {
	static propTypes = {
		onLoad: PropTypes.func,
		onSongAdd: PropTypes.func,
		onSongDelete: PropTypes.func,
    songs: PropTypes.object,
    user: PropTypes.object,
	};

  componentDidMount() {
    this.props.onLoad();
  }

	render() {
		return (
			<StyledDashboard>
        <Toolbar
          rightItems={
            <React.Fragment>
              <DashboardUserInfo>
                <DashboardUserImage
                  alt="User"
                  src={this.props.user.photoURL}
                  title={this.props.user.email}
                />
              </DashboardUserInfo>
            </React.Fragment>
          }
        />
        <DashboardCenteredContent>
          <SongList
            onDelete={this.deleteSong}
            onOpen={this.openSong}
            songs={this.props.songs}
          />
        </DashboardCenteredContent>
        <Fab
          onClick={this.addSong}>
          <Icon
            icon="plus"
          />
        </Fab>
			</StyledDashboard>
		);
	}

  addSong = () => {
    const name = window.prompt('Enter a name for the song', 'New Song');

    this.props.onSongAdd({
      name,
    });
  }

  deleteSong = (song) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete the song "${song.name}"?`);

    if (!shouldDelete) return;

    this.props.onSongDelete(song);
  };

  openSong = (song) => {
    this.props.history.push(`/song/${song.id}`);
  }
}
