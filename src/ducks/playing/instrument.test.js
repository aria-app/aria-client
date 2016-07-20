import Instrument from './instrument';

describe('Instrument', () => {
  let instrument;
  beforeEach(() => {
    instrument = Instrument.create('t1', 'square');
  });

  describe('getAvailableVoice', () => {
    it('should return available voice', () => {
      const expected = instrument.availableVoices[0];
      const result = instrument.getAvailableVoice();
      expect(result).toEqual(expected);
    });

    it('should remove voice from available voices', () => {
      const voice = instrument.availableVoices[0];
      instrument.getAvailableVoice();
      expect(instrument.availableVoices).not.toContain(voice);
    });

    it('should add voice to active voices', () => {
      const voice = instrument.availableVoices[0];
      instrument.getAvailableVoice();
      expect(instrument.activeVoices).toContain(voice);
    });
  });

  describe('getType', () => {
    it('should return type of voices', () => {
      const expected = 'square';
      const result = instrument.getType();
      expect(result).toEqual(expected);
    });
  });

  describe('makeVoiceAvailable', () => {
    it('should remove voice from active voices', () => {
      const voice = instrument.getAvailableVoice();
      expect(instrument.activeVoices).toContain(voice);
      instrument.makeVoiceAvailable(voice);
      expect(instrument.activeVoices).not.toContain(voice);
    });

    it('should add voice to available voices', () => {
      const voice = instrument.getAvailableVoice();
      expect(instrument.activeVoices).toContain(voice);
      instrument.makeVoiceAvailable(voice);
      expect(instrument.availableVoices).toContain(voice);
    });
  });
});
