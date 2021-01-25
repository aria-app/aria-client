import styled from '@emotion/styled/macro';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';

import shared from '../../shared';
import Ruler from './Ruler';
import Track from './Track';

const { LoadingIndicator } = shared.components;

const Root = styled.div({
  alignItems: 'flex-start',
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  overflow: 'auto',
  position: 'relative',
});

const Content = styled.div(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  flex: '1 0 auto',
  flexDirection: 'column',
  minWidth: '100%',
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(2) + 64,
  paddingRight: theme.spacing(2) + 128,
  paddingTop: theme.spacing(2),
  position: 'relative',
}));

const Underlay = styled.div({
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
});

const AddTrackButtonIcon = styled(AddIcon)(({ theme }) => ({
  fill: theme.palette.text.hint,
  marginRight: theme.spacing(1),
}));

const AddTrackButton = styled(Fab)(({ theme }) => ({
  '&&': {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'none',
    color: theme.palette.text.hint,
    fontWeight: 600,
    height: 40,
    lineHeight: 'inherit',
    paddingLeft: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.text.secondary,
      color: theme.palette.text.secondary,
      [AddTrackButtonIcon]: {
        fill: theme.palette.text.secondary,
      },
    },
  },
}));

TrackList.propTypes = {
  isLoading: PropTypes.bool,
  onPositionSet: PropTypes.func,
  onSequenceAdd: PropTypes.func,
  onSequenceDeselect: PropTypes.func,
  onSequenceEdit: PropTypes.func,
  onSequenceOpen: PropTypes.func,
  onSequenceSelect: PropTypes.func,
  onSongMeasureCountChange: PropTypes.func,
  onTrackAdd: PropTypes.func,
  onTrackStage: PropTypes.func,
  selectedSequence: PropTypes.object,
  songMeasureCount: PropTypes.number,
  tracks: PropTypes.arrayOf(PropTypes.object),
};

function TrackList(props) {
  const {
    isLoading,
    onPositionSet,
    onSequenceAdd,
    onSequenceDeselect,
    onSequenceEdit,
    onSequenceOpen,
    onSequenceSelect,
    onSongMeasureCountChange,
    onTrackAdd,
    onTrackStage,
    selectedSequence = {},
    songMeasureCount,
    tracks,
  } = props;

  return (
    <Root>
      <Fade in={isLoading} mountOnEnter unmountOnExit>
        <LoadingIndicator>LOADING SONG...</LoadingIndicator>
      </Fade>
      <Fade in={!isLoading} mountOnEnter unmountOnExit>
        <Content>
          <Underlay onClick={onSequenceDeselect} />
          <Ruler
            measureCount={songMeasureCount}
            measureWidth={64}
            onMeasureCountChange={onSongMeasureCountChange}
            onPositionSet={onPositionSet}
          />
          <AnimatePresence>
            {tracks.map((track) => (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={track.id}
              >
                <Track
                  onSequenceAdd={onSequenceAdd}
                  onSequenceEdit={onSequenceEdit}
                  onSequenceOpen={onSequenceOpen}
                  onSequenceSelect={onSequenceSelect}
                  onTrackSelect={onTrackStage}
                  selectedSequenceId={selectedSequence.id}
                  songMeasureCount={songMeasureCount}
                  track={track}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <AddTrackButton onClick={onTrackAdd} variant="extended">
            <AddTrackButtonIcon />
            Add Track
          </AddTrackButton>
        </Content>
      </Fade>
    </Root>
  );
}

export default React.memo(TrackList);
