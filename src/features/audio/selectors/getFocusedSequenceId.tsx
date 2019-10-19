import getOr from 'lodash/fp/getOr';

export const getFocusedSequenceId = getOr('', 'audio.focusedSequenceId');
