import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { Track } from './track';

describe('Track Component', () => {
  it('should be defined', () => {
    const component = mount(h(Track, {
      addSequence: () => {},
      deselectSequence: () => {},
      isMuted: false,
      isSoloing: false,
      onSequenceContextMenu: () => {},
      openSequence: () => {},
      onTrackSelect: () => {},
      selectedSequenceId: '',
      selectSequence: () => {},
      songMeasureCount: 0,
      toggleTrackIsMuted: () => {},
      toggleTrackIsSoloing: () => {},
      track: {},
    }));
    expect(component).toBeDefined();
  });

  describe('title', () => {
    it('should contain synth type', () => {
      expect(false).toEqual(true);
    });
  });

  describe('mute action', () => {
    it('should have active class when muted', () => {
      expect(false).toEqual(true);
    });

    it('should not have active class when not muted', () => {
      expect(false).toEqual(true);
    });
  });

  describe('solo action', () => {
    it('should have active class when soloing', () => {
      expect(false).toEqual(true);
    });

    it('should not have active class when not soloing', () => {
      expect(false).toEqual(true);
    });
  });

  describe('sequences', () => {
    it('should have width of song measure count * 64', () => {
      expect(false).toEqual(true);
    });
  });

  describe('add button', () => {
    it('should be translated to end of sequences', () => {
      expect(false).toEqual(true);
    });
  });
});
