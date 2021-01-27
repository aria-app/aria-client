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
      onClick={handleClick}
      sx={{
        backgroundColor: 'background.paper',
        borderColor: 'divider',
        borderStyle: 'solid',
        borderRadius: 1,
        borderWidth: 2,
        cursor: 'pointer',
        paddingLeft: 4,
        paddingRight: 2,
        paddingY: 2,
      }}
    >
      <Columns alignY="center" space="medium">
        <Column>
          <Text variant="label">{song.name}</Text>
        </Column>
        <Column width="content">
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
        </Column>
      </Columns>
    </Box>
  );
}

export default React.memo(SongListItem);
