import getOr from 'lodash/fp/getOr';

export const getPlaybackState = getOr('', 'audio.playbackState');
