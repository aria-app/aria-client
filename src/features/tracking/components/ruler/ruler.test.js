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
      const component = mount(h(Ruler, {
        extendSong: () => {},
        measureCount: 2,
        playbackState: '',
        pause: () => {},
        play: () => {},
        setPosition: () => {},
        shortenSong: () => {},
      }));
      const expected = 128;
      const { width } = component.find('.ruler__measures').prop('style');
      expect(width).toEqual(expected);
    });
  });
});
