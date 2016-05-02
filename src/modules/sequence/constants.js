import sound from 'modules/sound';

export const toolTypes = {
  DRAW: 'DRAW',
  ERASE: 'ERASE',
  SELECT: 'SELECT',
  MOVE: 'MOVE',
  PAN: 'PAN',
};

export const defaultSynthType = sound.constants.synthTypes.SQUARE;

export const defaultToolType = toolTypes.DRAW;

export const NAME = 'sequence';
