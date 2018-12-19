import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledDashboard = styled.div.attrs({
	className: 'Dashboard',
})`
  align-items: center;
  color: white;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
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
				{Object.values(this.props.songs).map(song => (
					<div
						key={song.id}
						onClick={() => this.props.history.push(`/song/${song.id}`)}>
						{song.name}
					</div>
				))}
				Dashboard
			</StyledDashboard>
		);
	}
}
