import CloseIcon from '@material-ui/icons/Close';
import formatDistance from 'date-fns/formatDistance';
import parseISO from 'date-fns/parseISO';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';

import shared from '../../shared';

const { Box, Stack, Typography } = shared.components;

SongListItem.propTypes = {
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  song: PropTypes.object,
};

function SongListItem(props) {
  const { onClick, onDelete, song } = props;

  const handleDeleteClick = React.useCallback(
    (e) => {
      e.stopPropagation();

      onDelete(song);
    },
    [onDelete, song],
  );

  const handleClick = React.useCallback(() => {
    onClick(song);
  }, [onClick, song]);

  const updatedText = React.useMemo(() => {
    const distanceInTime = formatDistance(
      parseISO(song.updatedAt),
      new Date(),
      { addSuffix: true },
    );

    return `Updated ${distanceInTime}`;
  }, [song]);

  return (
    <Box
      animate={{ opacity: 1 }}
      component={motion.div}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      interactive
      onClick={handleClick}
      sx={{
        backgroundColor: 'background.paper',
        borderColor: 'divider',
        borderStyle: 'solid',
        borderRadius: 1,
        borderWidth: 2,
        cursor: 'pointer',
        paddingBottom: 2,
        paddingLeft: 4,
        paddingRight: 2,
        paddingTop: 2,
      }}
    >
      <Stack direction="row" space={4} sx={{ alignItems: 'center' }}>
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="label">{song.name}</Typography>
          <Typography color="textSecondary" variant="caption">
            {updatedText}
          </Typography>
        </Stack>
        <Box
          onClick={handleDeleteClick}
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: 32,
            width: 32,
          }}
        >
          <CloseIcon sx={{ color: 'text.secondary' }} />
        </Box>
      </Stack>
    </Box>
  );
}

export default React.memo(SongListItem);
