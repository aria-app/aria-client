import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { RulerContainer } from '../ruler/ruler-container';
import { Track } from '../track/track';
import { Tracks } from './tracks';

describe('Tracks Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Tracks, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should invoke sequence deselect event when clicked', () => {
    const onSequenceDeselect = sinon.spy();
    const component = shallow(h(Tracks, {
      ...getRequiredProps(),
      onSequenceDeselect,
    }));
    const e = {
      stopPropagation: () => {},
    };
    component.simulate('click', e);
    expect(onSequenceDeselect.calledOnce).toEqual(true);
  });

  it('should stop propagation when clicked', () => {
    const component = shallow(h(Tracks, {
      ...getRequiredProps(),
    }));
    const stopPropagation = sinon.spy();
    const e = {
      stopPropagation,
    };
    component.simulate('click', e);
    expect(stopPropagation.calledOnce).toEqual(true);
  });

  describe('child component RulerContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
      }));
      const rulerContainerEl = component.find(RulerContainer);
      expect(rulerContainerEl.length).toEqual(1);
    });
  });

  describe('child component Track', () => {
    it('should be defined once for each track in tracks', () => {
      const tracks = [
        { id: 't1' },
        { id: 't2' },
      ];
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
        tracks,
      }));
      const trackEls = component.find(Track);
      expect(trackEls.length).toEqual(2);
    });

    it('should be muted if corresponding track id is in muted track ids', () => {
      const mutedTrackIds = ['t1'];
      const tracks = [
        { id: 't1' },
        { id: 't2' },
      ];
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
        mutedTrackIds,
        tracks,
      }));
      const trackEl = component.find(Track).first();
      expect(trackEl.prop('isMuted')).toEqual(true);
    });

    it('should not be muted if corresponding track id is not in muted track ids', () => {
      const mutedTrackIds = ['t2'];
      const tracks = [
        { id: 't1' },
        { id: 't2' },
      ];
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
        mutedTrackIds,
        tracks,
      }));
      const trackEl = component.find(Track).first();
      expect(trackEl.prop('isMuted')).toEqual(false);
    });

    it('should be soloing if corresponding track id is in soloing track ids', () => {
      const soloingTrackIds = ['t1'];
      const tracks = [
        { id: 't1' },
        { id: 't2' },
      ];
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
        soloingTrackIds,
        tracks,
      }));
      const trackEl = component.find(Track).first();
      expect(trackEl.prop('isSoloing')).toEqual(true);
    });

    it('should not be soloing if corresponding track id is not in soloing track ids', () => {
      const soloingTrackIds = ['t2'];
      const tracks = [
        { id: 't1' },
        { id: 't2' },
      ];
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
        soloingTrackIds,
        tracks,
      }));
      const trackEl = component.find(Track).first();
      expect(trackEl.prop('isSoloing')).toEqual(false);
    });

    it('should have correct remaining props', () => {
      const onSequenceAdd = () => {};
      const onSequenceContextMenu = () => {};
      const onSequenceOpen = () => {};
      const onSequenceSelect = () => {};
      const onTrackIsMutedToggle = () => {};
      const onTrackIsSoloingToggle = () => {};
      const selectedSequenceId = 's1';
      const songMeasureCount = 4;
      const tracks = [{ id: 't1' }, { id: 't2' }];
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
        onSequenceAdd,
        onSequenceContextMenu,
        onSequenceOpen,
        onSequenceSelect,
        onTrackIsMutedToggle,
        onTrackIsSoloingToggle,
        selectedSequenceId,
        songMeasureCount,
        tracks,
      }));
      const trackEl = component.find(Track).first();
      const { handleTrackSelect } = component.instance();
      expect(trackEl.prop('track')).toEqual(tracks[0]);
      expect(trackEl.prop('onSequenceAdd')).toEqual(onSequenceAdd);
      expect(trackEl.prop('onSequenceContextMenu')).toEqual(onSequenceContextMenu);
      expect(trackEl.prop('onSequenceOpen')).toEqual(onSequenceOpen);
      expect(trackEl.prop('onSequenceSelect')).toEqual(onSequenceSelect);
      expect(trackEl.prop('onTrackIsMutedToggle')).toEqual(onTrackIsMutedToggle);
      expect(trackEl.prop('onTrackIsSoloingToggle')).toEqual(onTrackIsSoloingToggle);
      expect(trackEl.prop('onTrackSelect')).toEqual(handleTrackSelect);
      expect(trackEl.prop('selectedSequenceId')).toEqual(selectedSequenceId);
      expect(trackEl.prop('songMeasureCount')).toEqual(songMeasureCount);
    });
  });

  describe('element __add-button', () => {
    it('should be defined', () => {
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
      }));
      const addButtonEl = component.find('.tracks__add-button');
      expect(addButtonEl.length).toEqual(1);
    });

    it('should have width equal to (song measure count * notes per measure count * 2px per note) + number of possible y positions for notes', () => {
      const songMeasureCount = 4;
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
        songMeasureCount,
      }));
      const addButtonEl = component.find('.tracks__add-button');
      const expected = (songMeasureCount * 32 * 2) + 84;
      expect(addButtonEl.prop('style').width).toEqual(expected);
    });

    it('should invoke track add event when clicked', () => {
      const onTrackAdd = sinon.spy();
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
        onTrackAdd,
      }));
      const addButtonEl = component.find('.tracks__add-button');
      addButtonEl.simulate('click');
      expect(onTrackAdd.calledOnce).toEqual(true);
    });
  });

  describe('child component __add-button__icon', () => {
    it('should be defined', () => {
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
      }));
      const addButtonIconEl = component.find('.tracks__add-button__icon');
      expect(addButtonIconEl.length).toEqual(1);
    });

    it('should have plus icon', () => {
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
      }));
      const addButtonIconEl = component.find('.tracks__add-button__icon');
      expect(addButtonIconEl.prop('icon')).toEqual('plus');
    });

    it('should have large size', () => {
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
      }));
      const addButtonIconEl = component.find('.tracks__add-button__icon');
      expect(addButtonIconEl.prop('size')).toEqual('large');
    });
  });

  describe('element __add-button__text', () => {
    it('should be defined', () => {
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
      }));
      const addButtonTextEl = component.find('.tracks__add-button__text');
      expect(addButtonTextEl.length).toEqual(1);
    });

    it('should contain "Add Track"', () => {
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
      }));
      const addButtonTextEl = component.find('.tracks__add-button__text');
      expect(addButtonTextEl.text()).toEqual('Add Track');
    });
  });

  describe('method handleTrackSelect', () => {
    it('should invoke track select event with track id', () => {
      const onTrackStage = sinon.spy();
      const component = shallow(h(Tracks, {
        ...getRequiredProps(),
        onTrackStage,
      }));
      const trackId = 't1';
      component.instance().handleTrackSelect(trackId);
      expect(onTrackStage.lastCall.args).toEqual([trackId]);
    });
  });
});

function getRequiredProps() {
  return {
    mutedTrackIds: [],
    onSequenceAdd: () => {},
    onSequenceContextMenu: () => {},
    onSequenceDeselect: () => {},
    onSequenceOpen: () => {},
    onSequenceSelect: () => {},
    onTrackAdd: () => {},
    onTrackIsMutedToggle: () => {},
    onTrackIsSoloingToggle: () => {},
    onTrackStage: () => {},
    selectedSequenceId: '',
    soloingTrackIds: [],
    songMeasureCount: 1,
    tracks: [],
  };
}
