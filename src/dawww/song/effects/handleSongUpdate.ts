import { diff } from 'deep-diff';

import { DawwwEffects, DawwwSong } from '../../types';
import { interpretDiff } from './interpretDiff';

export const handleSongUpdate: DawwwEffects = (getState, action, shared) => {
  const { prevSong, song } = action.payload;
  const differences = diff<DawwwSong, DawwwSong>(prevSong, song) || [];

  // console.group('handleSongUpdate');
  // differences.forEach((d, i) => {
  //   console.log(`Difference ${i + 1}: `, d);
  //   console.log(
  //     `Interpretation ${i + 1}: `,
  //     interpretDiff(differences[i], song),
  //   );
  // });
  // console.groupEnd();

  differences.forEach((diff) => {
    shared.dispatch(interpretDiff(diff, song));
  });
};
