import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { Ruler } from './ruler';

describe('Ruler Component', () => {
  it('should be defined', () => {
    const component = mount(h(Ruler, {
      extendSong: () => {},
      measureCount: 0,
      playbackState: '',
      pause: () => {},
      play: () => {},
      setPosition: () => {},
      shortenSong: () => {},
    }));
    expect(component).toBeDefined();
  });

  describe('measures', () => {
    it('should have width of measureCount * 64', () => {
      expect(false).toEqual(true);
    });
  });
});
