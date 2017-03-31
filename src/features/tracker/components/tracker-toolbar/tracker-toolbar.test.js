import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { TrackerToolbar } from './tracker-toolbar';

describe('Tracker Toolbar Component', () => {
  it('should be defined', () => {
    const component = shallow(h(TrackerToolbar, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should have position top', () => {
    const component = shallow(h(TrackerToolbar, {
      ...getRequiredProps(),
    }));
    expect(component.prop('position')).toEqual('top');
  });

  it('should be alternate when selected sequence id is defined', () => {
    const selectedSequenceId = 's1';
    const component = shallow(h(TrackerToolbar, {
      ...getRequiredProps(),
      selectedSequenceId,
    }));
    expect(component.prop('isAlternate')).toEqual(true);
  });

  it('should not be alternate when selected sequence id is not defined', () => {
    const component = shallow(h(TrackerToolbar, {
      ...getRequiredProps(),
    }));
    expect(component.prop('isAlternate')).toEqual(false);
  });

  describe('element __sequence-actions', () => {
    it('should be defined when alternate', () => {
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        selectedSequenceId,
      }));
      const sequenceActionsEl = component.dive().find('.tracker-toolbar__sequence-actions');
      expect(sequenceActionsEl.length).toEqual(1);
    });

    it('should not be defined when not alternate', () => {
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
      }));
      const sequenceActionsEl = component.dive().find('.tracker-toolbar__sequence-actions');
      expect(sequenceActionsEl.length).toEqual(0);
    });
  });

  describe('child component __sequence-actions__open', () => {
    it('should be defined when alternate', () => {
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        selectedSequenceId,
      }));
      const sequenceActionsOpenEl = component.dive().find('.tracker-toolbar__sequence-actions__open');
      expect(sequenceActionsOpenEl.length).toEqual(1);
    });

    it('should not be defined when not alternate', () => {
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
      }));
      const sequenceActionsOpenEl = component.dive().find('.tracker-toolbar__sequence-actions__open');
      expect(sequenceActionsOpenEl.length).toEqual(0);
    });

    it('should have icon pencil', () => {
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        selectedSequenceId,
      }));
      const sequenceActionsOpenEl = component.dive().find('.tracker-toolbar__sequence-actions__open');
      expect(sequenceActionsOpenEl.prop('icon')).toEqual('pencil');
    });

    it('should have click event equal to selected sequence open event', () => {
      const onSelectedSequenceOpen = () => {};
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        onSelectedSequenceOpen,
        selectedSequenceId,
      }));
      const sequenceActionsOpenEl = component.dive().find('.tracker-toolbar__sequence-actions__open');
      expect(sequenceActionsOpenEl.prop('onClick')).toEqual(onSelectedSequenceOpen);
    });
  });

  describe('child component __sequence-actions__delete', () => {
    it('should be defined when alternate', () => {
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        selectedSequenceId,
      }));
      const sequenceActionsDeleteEl = component.dive().find('.tracker-toolbar__sequence-actions__delete');
      expect(sequenceActionsDeleteEl.length).toEqual(1);
    });

    it('should not be defined when not alternate', () => {
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
      }));
      const sequenceActionsDeleteEl = component.dive().find('.tracker-toolbar__sequence-actions__delete');
      expect(sequenceActionsDeleteEl.length).toEqual(0);
    });

    it('should have icon trash', () => {
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        selectedSequenceId,
      }));
      const sequenceActionsDeleteEl = component.dive().find('.tracker-toolbar__sequence-actions__delete');
      expect(sequenceActionsDeleteEl.prop('icon')).toEqual('trash');
    });

    it('should have click event equal to selected sequence delete event', () => {
      const onSelectedSequenceDelete = () => {};
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        onSelectedSequenceDelete,
        selectedSequenceId,
      }));
      const sequenceActionsDeleteEl = component.dive().find('.tracker-toolbar__sequence-actions__delete');
      expect(sequenceActionsDeleteEl.prop('onClick')).toEqual(onSelectedSequenceDelete);
    });
  });

  describe('child component __sequence-actions__shorten', () => {
    it('should be defined when alternate', () => {
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        selectedSequenceId,
      }));
      const sequenceActionsShortenEl = component.dive().find('.tracker-toolbar__sequence-actions__shorten');
      expect(sequenceActionsShortenEl.length).toEqual(1);
    });

    it('should not be defined when not alternate', () => {
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
      }));
      const sequenceActionsShortenEl = component.dive().find('.tracker-toolbar__sequence-actions__shorten');
      expect(sequenceActionsShortenEl.length).toEqual(0);
    });

    it('should have icon long-arrow-left', () => {
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        selectedSequenceId,
      }));
      const sequenceActionsShortenEl = component.dive().find('.tracker-toolbar__sequence-actions__shorten');
      expect(sequenceActionsShortenEl.prop('icon')).toEqual('long-arrow-left');
    });

    it('should have click event equal to selected sequence shorten event', () => {
      const onSelectedSequenceShorten = () => {};
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        onSelectedSequenceShorten,
        selectedSequenceId,
      }));
      const sequenceActionsShortenEl = component.dive().find('.tracker-toolbar__sequence-actions__shorten');
      expect(sequenceActionsShortenEl.prop('onClick')).toEqual(onSelectedSequenceShorten);
    });
  });

  describe('child component __sequence-actions__move-left', () => {
    it('should be defined when alternate', () => {
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        selectedSequenceId,
      }));
      const sequenceActionsMoveLeftEl = component.dive().find('.tracker-toolbar__sequence-actions__move-left');
      expect(sequenceActionsMoveLeftEl.length).toEqual(1);
    });

    it('should not be defined when not alternate', () => {
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
      }));
      const sequenceActionsMoveLeftEl = component.dive().find('.tracker-toolbar__sequence-actions__move-left');
      expect(sequenceActionsMoveLeftEl.length).toEqual(0);
    });

    it('should have icon arrow-left', () => {
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        selectedSequenceId,
      }));
      const sequenceActionsMoveLeftEl = component.dive().find('.tracker-toolbar__sequence-actions__move-left');
      expect(sequenceActionsMoveLeftEl.prop('icon')).toEqual('arrow-left');
    });

    it('should have click event equal to selected sequence move left event', () => {
      const onSelectedSequenceMoveLeft = () => {};
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        onSelectedSequenceMoveLeft,
        selectedSequenceId,
      }));
      const sequenceActionsMoveLeftEl = component.dive().find('.tracker-toolbar__sequence-actions__move-left');
      expect(sequenceActionsMoveLeftEl.prop('onClick')).toEqual(onSelectedSequenceMoveLeft);
    });
  });

  describe('child component __sequence-actions__move-right', () => {
    it('should be defined when alternate', () => {
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        selectedSequenceId,
      }));
      const sequenceActionsMoveRightEl = component.dive().find('.tracker-toolbar__sequence-actions__move-right');
      expect(sequenceActionsMoveRightEl.length).toEqual(1);
    });

    it('should not be defined when not alternate', () => {
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
      }));
      const sequenceActionsMoveRightEl = component.dive().find('.tracker-toolbar__sequence-actions__move-right');
      expect(sequenceActionsMoveRightEl.length).toEqual(0);
    });

    it('should have icon arrow-right', () => {
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        selectedSequenceId,
      }));
      const sequenceActionsMoveRightEl = component.dive().find('.tracker-toolbar__sequence-actions__move-right');
      expect(sequenceActionsMoveRightEl.prop('icon')).toEqual('arrow-right');
    });

    it('should have click event equal to selected sequence move right event', () => {
      const onSelectedSequenceMoveRight = () => {};
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        onSelectedSequenceMoveRight,
        selectedSequenceId,
      }));
      const sequenceActionsMoveRightEl = component.dive().find('.tracker-toolbar__sequence-actions__move-right');
      expect(sequenceActionsMoveRightEl.prop('onClick')).toEqual(onSelectedSequenceMoveRight);
    });
  });

  describe('child component __sequence-actions__extend', () => {
    it('should be defined when alternate', () => {
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        selectedSequenceId,
      }));
      const sequenceActionsExtendEl = component.dive().find('.tracker-toolbar__sequence-actions__extend');
      expect(sequenceActionsExtendEl.length).toEqual(1);
    });

    it('should not be defined when not alternate', () => {
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
      }));
      const sequenceActionsExtendEl = component.dive().find('.tracker-toolbar__sequence-actions__extend');
      expect(sequenceActionsExtendEl.length).toEqual(0);
    });

    it('should have icon long-arrow-right', () => {
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        selectedSequenceId,
      }));
      const sequenceActionsExtendEl = component.dive().find('.tracker-toolbar__sequence-actions__extend');
      expect(sequenceActionsExtendEl.prop('icon')).toEqual('long-arrow-right');
    });

    it('should have click event equal to selected sequence extend event', () => {
      const onSelectedSequenceExtend = () => {};
      const selectedSequenceId = 's1';
      const component = shallow(h(TrackerToolbar, {
        ...getRequiredProps(),
        onSelectedSequenceExtend,
        selectedSequenceId,
      }));
      const sequenceActionsExtendEl = component.dive().find('.tracker-toolbar__sequence-actions__extend');
      expect(sequenceActionsExtendEl.prop('onClick')).toEqual(onSelectedSequenceExtend);
    });
  });
});

function getRequiredProps() {
  return {
    onSelectedSequenceDelete: () => {},
    onSelectedSequenceExtend: () => {},
    onSelectedSequenceMoveLeft: () => {},
    onSelectedSequenceMoveRight: () => {},
    onSelectedSequenceOpen: () => {},
    onSelectedSequenceShorten: () => {},
    selectedSequenceId: '',
  };
}
