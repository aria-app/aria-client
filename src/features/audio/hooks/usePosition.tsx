import { useRecoilValue } from 'recoil';

import { position } from '../atoms';

export default function usePosition() {
  return useRecoilValue(position);
}
