import MuiFade, { FadeProps } from '@material-ui/core/Fade';
import { ReactElement } from 'react';

export default function Fade(props: FadeProps): ReactElement {
  return <MuiFade mountOnEnter unmountOnExit {...props} />;
}
