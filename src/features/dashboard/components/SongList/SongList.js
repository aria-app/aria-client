import orderBy from 'lodash/fp/orderBy';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components/macro';
import { SongListItem } from '../SongListItem/SongListItem';

const StyledSongList = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding-bottom: ${props => props.theme.margin.s}px;
  padding-top: ${props => props.theme.margin.s}px;
`;

SongList.propTypes = {
  onDelete: PropTypes.func,
  onOpen: PropTypes.func,
  songs: PropTypes.object,
};

// TODO: Transition in songs in Song List to prevent duplicate entries on transition
export function SongList(props) {
  const sortedSongs = useMemo(() => orderBy(
    x => x.dateModified,
    'desc',
    Object.values(props.songs),
  ), [props.songs]);

  const songTransitions = useTransition(sortedSongs, song => song.id, {
    config: {
      clamp: true,
      tension: 200,
    },
    reset: true,
    trail: 100,
    unique: true,
    from: {
      height: 0,
      marginLeft: -64,
      opacity: 0,
    },
    enter: {
      height: 48,
      marginLeft: 0,
      opacity: 1,
    },
    leave: {
      height: 0,
      marginLeft: 64,
      opacity: 0,
    },
  });

  return (
    <StyledSongList>
      {songTransitions.map(({ item, key, props: animation }) => (
        <animated.div
          key={key}
          style={animation}>
          <SongListItem
            onDelete={props.onDelete}
            onOpen={props.onOpen}
            song={item}
          />
        </animated.div>
      ))}
    </StyledSongList>
  );
}
