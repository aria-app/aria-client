import Instrument from './instrument';

const instrument = Instrument.create('a', 'square');

export const playNote = instrument.playNote.bind(instrument);
