import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React from 'react';

import shared from '../../shared';

const { Box, Column, Columns, Text } = shared.components;

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
      borderRadius="medium"
      borderWidth={2}
      isInteractionOverlayVisible
      onClick={handleClick}
      paddingLeft="medium"
      paddingRight="small"
      paddingY="small"
    >
      <Columns alignY="center" space="medium">
        <Column>
          <Text variant="label">{song.name}</Text>
        </Column>
        <Column width="content">
          <IconButton onClick={handleDeleteClick} size="small">
            <CloseIcon />
          </IconButton>
        </Column>
      </Columns>
    </Box>
  );
}

export default React.memo(SongListItem);
