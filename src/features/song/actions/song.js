import { NAME } from '../constants';

export const SONG_EXTENDED = `${NAME}/SONG_EXTENDED`;
export const SONG_LOADED = `${NAME}/SONG_LOADED`;
export const SONG_SHORTENED = `${NAME}/SONG_SHORTENED`;

export const songExtended = () => ({
  type: SONG_EXTENDED,
});

export const songLoaded = song => ({
  type: SONG_LOADED,
  song,
});

export const songShortened = () => ({
  type: SONG_SHORTENED,
});
