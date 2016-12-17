import _ from 'lodash';
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Sequence } from '../sequence/sequence';
import { Track } from './track';

describe('Track Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Track, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  describe('element __body', () => {
    it('should be defined', () => {
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodyEl = component.find('.track__body');
      expect(bodyEl.length).toEqual(1);
    });
  });

  describe('element __body__header', () => {
    it('should be defined', () => {
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodyHeaderEl = component.find('.track__body__header');
      expect(bodyHeaderEl.length).toEqual(1);
    });

    it('should invoke track select event with track id when clicked', () => {
      const onTrackSelect = sinon.spy();
      const id = 'my-track-id';
      const track = {
        sequences: [],
        id,
      };
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        onTrackSelect,
        track,
      }));
      const bodyHeaderEl = component.find('.track__body__header');
      bodyHeaderEl.simulate('click');
      expect(_.last(onTrackSelect.args)[0]).toEqual(id);
    });
  });

  describe('element __body__header__title', () => {
    it('should be defined', () => {
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodyHeaderTitleEl = component.find('.track__body__header__title');
      expect(bodyHeaderTitleEl.length).toEqual(1);
    });

    it('should contain track synth type', () => {
      const synthType = 'my-synth';
      const track = {
        sequences: [],
        synthType,
      };
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        track,
      }));
      const bodyHeaderTitleEl = component.find('.track__body__header__title');
      expect(bodyHeaderTitleEl.text()).toEqual(synthType);
    });
  });

  describe('element __body__header__actions', () => {
    it('should be defined', () => {
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodyHeaderActionsEl = component.find('.track__body__header__actions');
      expect(bodyHeaderActionsEl.length).toEqual(1);
    });
  });

  describe('element __body__header__actions__action--mute', () => {
    it('should be defined', () => {
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodyHeaderActionsActionMuteEl = component.find('.track__body__header__actions__action--mute');
      expect(bodyHeaderActionsActionMuteEl.length).toEqual(1);
    });

    it('should invoke track is muted toggle event when clicked', () => {
      const onTrackIsMutedToggle = sinon.spy();
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        onTrackIsMutedToggle,
      }));
      const bodyHeaderActionsActionMuteEl = component.find('.track__body__header__actions__action--mute');
      const e = {
        stopPropagation: () => {},
      };
      bodyHeaderActionsActionMuteEl.simulate('click', e);
      expect(onTrackIsMutedToggle.calledOnce).toEqual(true);
    });

    it('should stop propagation when clicked', () => {
      const stopPropagation = sinon.spy();
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodyHeaderActionsActionMuteEl = component.find('.track__body__header__actions__action--mute');
      const e = { stopPropagation };
      bodyHeaderActionsActionMuteEl.simulate('click', e);
      expect(stopPropagation.calledOnce).toEqual(true);
    });

    it('should contain "M"', () => {
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodyHeaderActionsActionMuteEl = component.find('.track__body__header__actions__action--mute');
      expect(bodyHeaderActionsActionMuteEl.text()).toEqual('M');
    });
  });

  describe('element __body__header__actions__action--solo', () => {
    it('should be defined', () => {
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodyHeaderActionsActionSoloEl = component.find('.track__body__header__actions__action--solo');
      expect(bodyHeaderActionsActionSoloEl.length).toEqual(1);
    });

    it('should invoke track is soloing toggle when clicked', () => {
      const onTrackIsSoloingToggle = sinon.spy();
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        onTrackIsSoloingToggle,
      }));
      const bodyHeaderActionsActionSoloEl = component.find('.track__body__header__actions__action--solo');
      const e = {
        stopPropagation: () => {},
      };
      bodyHeaderActionsActionSoloEl.simulate('click', e);
      expect(onTrackIsSoloingToggle.calledOnce).toEqual(true);
    });

    it('should stop propagation when clicked', () => {
      const stopPropagation = sinon.spy();
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodyHeaderActionsActionSoloEl = component.find('.track__body__header__actions__action--solo');
      const e = {
        stopPropagation,
      };
      bodyHeaderActionsActionSoloEl.simulate('click', e);
      expect(stopPropagation.calledOnce).toEqual(true);
    });

    it('should contain "S"', () => {
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodyHeaderActionsActionSoloEl = component.find('.track__body__header__actions__action--solo');
      expect(bodyHeaderActionsActionSoloEl.text()).toEqual('S');
    });
  });

  describe('element __body__sequences', () => {
    it('should be defined', () => {
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodySequencesEl = component.find('.track__body__sequences');
      expect(bodySequencesEl.length).toEqual(1);
    });

    it('should have width of song measure count * notes per measure * 2px per note', () => {
      const songMeasureCount = 4;
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        songMeasureCount,
      }));
      const bodySequencesEl = component.find('.track__body__sequences');
      expect(bodySequencesEl.prop('style').width).toEqual(songMeasureCount * 32 * 2);
    });
  });

  describe('child component Sequence', () => {
    it('should be defined once for each sequence in track', () => {
      const track = {
        sequences: [
          { id: 's1' },
          { id: 's2' },
        ],
      };
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        track,
      }));
      const sequenceEls = component.find(Sequence);
      expect(sequenceEls.length).toEqual(2);
    });

    it('should be selected if corresponding sequence id is selected sequence id', () => {
      const track = {
        sequences: [
          { id: 's1' },
          { id: 's2' },
        ],
      };
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        selectedSequenceId: 's1',
        track,
      }));
      const sequenceEls = component.find(Sequence);
      expect(sequenceEls.first().prop('isSelected')).toEqual(true);
    });

    it('should not be selected if corresponding sequence id is not selected sequence id', () => {
      const track = {
        sequences: [
          { id: 's1' },
          { id: 's2' },
        ],
      };
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        selectedSequenceId: 's2',
        track,
      }));
      const sequenceEls = component.find(Sequence);
      expect(sequenceEls.first().prop('isSelected')).toEqual(false);
    });

    it('should have correct handler for open event', () => {
      const track = {
        sequences: [
          { id: 's1' },
          { id: 's2' },
        ],
      };
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        track,
      }));
      const sequenceEls = component.find(Sequence);
      const { handleBodySequencesSequenceOpen } = component.instance();
      expect(sequenceEls.first().prop('onOpen')).toEqual(handleBodySequencesSequenceOpen);
    });

    it('should have correct handler for select event', () => {
      const track = {
        sequences: [
          { id: 's1' },
          { id: 's2' },
        ],
      };
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        track,
      }));
      const sequenceEls = component.find(Sequence);
      const { handleBodySequencesSequenceSelect } = component.instance();
      expect(sequenceEls.first().prop('onSelect')).toEqual(handleBodySequencesSequenceSelect);
    });

    it('should have sequence equal to corresponding sequence', () => {
      const firstSequence = { id: 's1' };
      const track = {
        sequences: [
          firstSequence,
          { id: 's2' },
        ],
      };
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        track,
      }));
      const sequenceEls = component.find(Sequence);
      expect(sequenceEls.first().prop('sequence')).toEqual(firstSequence);
    });
  });

  describe('element __body__sequences__add-button', () => {
    it('should be defined', () => {
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodySequencesAddButton = component.find('.track__body__sequences__add-button');
      expect(bodySequencesAddButton.length).toEqual(1);
    });

    it('should invoke sequence add event with track id and add position when clicked', () => {
      const onSequenceAdd = sinon.spy();
      const track = {
        id: 'my-track',
        sequences: [
          { id: 's1', position: 0, measureCount: 1 },
          { id: 's2', position: 1, measureCount: 3 },
        ],
      };
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        onSequenceAdd,
        track,
      }));
      const bodySequencesAddButton = component.find('.track__body__sequences__add-button');
      bodySequencesAddButton.simulate('click');
      expect(onSequenceAdd.lastCall.args).toEqual([track.id, 4]);
    });

    it('should have translateX equal to add position * notes per measure * 2px per note', () => {
      const track = {
        id: 'my-track',
        sequences: [
          { id: 's1', position: 0, measureCount: 1 },
          { id: 's2', position: 1, measureCount: 3 },
        ],
      };
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        track,
      }));
      const bodySequencesAddButton = component.find('.track__body__sequences__add-button');
      const transform = `translateX(${4 * 32 * 2}px)`;
      expect(bodySequencesAddButton.prop('style').transform).toEqual(transform);
    });
  });

  describe('child component __body__sequences__add-button__icon', () => {
    it('should be defined', () => {
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodySequencesAddButtonIcon = component.find('.track__body__sequences__add-button__icon');
      expect(bodySequencesAddButtonIcon.length).toEqual(1);
    });

    it('should have plus icon', () => {
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodySequencesAddButtonIcon = component.find('.track__body__sequences__add-button__icon');
      expect(bodySequencesAddButtonIcon.prop('icon')).toEqual('plus');
    });

    it('should have large size', () => {
      const component = shallow(h(Track, {
        ...getRequiredProps(),
      }));
      const bodySequencesAddButtonIcon = component.find('.track__body__sequences__add-button__icon');
      expect(bodySequencesAddButtonIcon.prop('size')).toEqual('large');
    });
  });

  describe('method handleBodySequencesSequenceOpen', () => {
    it('should invoke open event with sequence id', () => {
      const onSequenceOpen = sinon.spy();
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        onSequenceOpen,
      }));
      const sequenceId = 'my-seq';
      component.instance().handleBodySequencesSequenceOpen(sequenceId);
      expect(onSequenceOpen.lastCall.args).toEqual([sequenceId]);
    });
  });

  describe('method handleBodySequencesSequenceSelect', () => {
    it('should invoke select event with sequence id', () => {
      const onSequenceSelect = sinon.spy();
      const component = shallow(h(Track, {
        ...getRequiredProps(),
        onSequenceSelect,
      }));
      const sequenceId = 'my-seq';
      component.instance().handleBodySequencesSequenceSelect(sequenceId);
      expect(onSequenceSelect.lastCall.args).toEqual([sequenceId]);
    });
  });
});

function getRequiredProps() {
  return {
    isMuted: false,
    isSoloing: false,
    onSequenceAdd: () => {},
    onSequenceContextMenu: () => {},
    onSequenceOpen: () => {},
    onSequenceSelect: () => {},
    onTrackIsMutedToggle: () => {},
    onTrackIsSoloingToggle: () => {},
    onTrackSelect: () => {},
    selectedSequenceId: '',
    songMeasureCount: 1,
    track: { sequences: [] },
  };
}
