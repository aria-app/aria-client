import { Mixins, MixinsOptions } from '@material-ui/core/styles/createMixins';

declare module '@material-ui/core/styles/createMixins' {
  interface Mixins {
    absoluteFill: {
      bottom: React.CSSProperties['bottom'];
      left: React.CSSProperties['left'];
      position: React.CSSProperties['position'];
      right: React.CSSProperties['right'];
      top: React.CSSProperties['top'];
    };
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    mixins: Mixins;
  }
}

export default {
  absoluteFill: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
} as MixinsOptions;
