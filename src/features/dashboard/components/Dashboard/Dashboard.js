import PropTypes from 'prop-types';
import React from 'react';
import { hideIf } from 'react-render-helpers';
import { animated } from 'react-spring';
import styled from 'styled-components/macro';
import shared from '../../../shared';
import { SongList } from '../SongList/SongList';

const { Icon, Toolbar, FadeOut } = shared.components;
const { mixins } = shared.styles;

const LoadingIndicator = styled(animated.div)`
  align-items: center;
  bottom: 0;
  color: white;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

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
		isLoadingSongs: PropTypes.bool,
		onLoad: PropTypes.func,
		onSongAdd: PropTypes.func,
		onSongDelete: PropTypes.func,
    songs: PropTypes.object,
    user: PropTypes.object,
	};

  componentDidMount() {
    this.props.onLoad();

    window.document.title = 'Dashboard - Zen Sequencer';
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
        <FadeOut
          component={LoadingIndicator}
          isVisible={this.props.isLoadingSongs}>
          LOADING SONGS...
        </FadeOut>
        <DashboardCenteredContent>
          {hideIf(this.props.isLoadingSongs)(() =>
            <SongList
              onDelete={this.deleteSong}
              onOpen={this.openSong}
              songs={this.props.songs}
            />
          )}
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

    if (!name) return;

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
