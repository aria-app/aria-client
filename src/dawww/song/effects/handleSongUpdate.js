import deepDiff from 'deep-diff';

import { interpretDiff } from './interpretDiff';

export function handleSongUpdate(getState, action, shared) {
  const { prevSong, song } = action.payload;
  const differences = deepDiff(prevSong, song) || [];

  // console.group('handleSongUpdate');
  // differences.forEach((d, i) => {
  //   console.log(`D ${i + 1}: `, d);
  //   console.log(`I ${i + 1}: `, interpretDiff(differences[i], song));
  // });
  // console.groupEnd('handleSongUpdate');

  differences.forEach((diff) => {
    shared.dispatch(interpretDiff(diff, song));
  });
}
