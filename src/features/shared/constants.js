export const NAME = 'shared';

export const defaultBPM = 120;

export const localStorageKey = 'currentSong';

export const minBPM = 60;
export const maxBPM = 400;

export const octaveRange = [0, 1, 2, 3, 4, 5, 6];

export const synthTypes = {
  PWM: 'pwm',
  SAWTOOTH: 'sawtooth',
  SINE: 'sine',
  SQUARE: 'square',
};

export const toolTypes = {
  DRAW: 'DRAW',
  ERASE: 'ERASE',
  SELECT: 'SELECT',
  MOVE: 'MOVE',
  PAN: 'PAN',
};

export const defaultSynthType = synthTypes.SQUARE;

export const defaultToolType = toolTypes.SELECT;
