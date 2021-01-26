import { IconButton, Stack, Text } from '@chakra-ui/react';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React from 'react';

import shared from '../../shared';

const { Box } = shared.components;

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

  return (
    <Box
      backgroundColor="paper"
      borderColor="border"
      borderRadius="base"
      borderWidth={2}
      isInteractionOverlayVisible
      onClick={handleClick}
      paddingLeft="medium"
      paddingRight="small"
      paddingY="small"
    >
      <Stack align="center" direction="row" space={4}>
        <Text flexGrow={1} variant="label">
          {song.name}
        </Text>
        <IconButton icon={<CloseIcon />} onClick={handleDeleteClick} />
      </Stack>
    </Box>
  );
}

export default React.memo(SongListItem);
