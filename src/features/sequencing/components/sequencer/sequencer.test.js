import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import shared from '../../../shared';
import { GridContainer } from '../grid/grid-container';
import { KeysContainer } from '../keys/keys-container';
import { getResizeLengths, Sequencer } from './sequencer';

const { toolTypes } = shared.constants;

describe('Sequencer Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Sequencer, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  describe('child component __toolbar', () => {
    it('should be defined', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
      }));
      const toolbarEl = component.find('.sequencer__toolbar');
      expect(toolbarEl.length).toEqual(1);
    });

    it('should be alternate when some notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
      }));
      const toolbarEl = component.find('.sequencer__toolbar');
      expect(toolbarEl.prop('isAlternate')).toEqual(true);
    });

    it('should not be alternate when no notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar');
      expect(toolbarEl.prop('isAlternate')).toEqual(false);
    });
  });

  describe('child component __toolbar__delete-button', () => {
    it('should be defined when some notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarDeleteButtonEl = toolbarEl.find('.sequencer__toolbar__delete-button');
      expect(toolbarDeleteButtonEl.length).toEqual(1);
    });

    it('should not be defined when no notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarDeleteButtonEl = toolbarEl.find('.sequencer__toolbar__delete-button');
      expect(toolbarDeleteButtonEl.length).toEqual(0);
    });

    it('should have correct props', () => {
      const onSelectedNotesDelete = () => {};
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
        onSelectedNotesDelete,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarDeleteButtonEl = toolbarEl.find('.sequencer__toolbar__delete-button');
      expect(toolbarDeleteButtonEl.prop('icon')).toEqual('trash');
      expect(toolbarDeleteButtonEl.prop('onClick')).toEqual(onSelectedNotesDelete);
      expect(toolbarDeleteButtonEl.prop('toolTip')).toEqual('Delete');
    });
  });

  describe('child component __toolbar__duplicate-button', () => {
    it('should be defined when some notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarDuplicateButtonEl = toolbarEl.find('.sequencer__toolbar__duplicate-button');
      expect(toolbarDuplicateButtonEl.length).toEqual(1);
    });

    it('should not be defined when no notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarDuplicateButtonEl = toolbarEl.find('.sequencer__toolbar__duplicate-button');
      expect(toolbarDuplicateButtonEl.length).toEqual(0);
    });

    it('should have correct props', () => {
      const onSelectedNotesDuplicate = () => {};
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
        onSelectedNotesDuplicate,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarDuplicateButtonEl = toolbarEl.find('.sequencer__toolbar__duplicate-button');
      expect(toolbarDuplicateButtonEl.prop('icon')).toEqual('clone');
      expect(toolbarDuplicateButtonEl.prop('onClick')).toEqual(onSelectedNotesDuplicate);
      expect(toolbarDuplicateButtonEl.prop('toolTip')).toEqual('Duplicate');
    });
  });

  describe('child component __toolbar__up-octave-button', () => {
    it('should be defined when some notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarOctaveUpButtonEl = toolbarEl.find('.sequencer__toolbar__octave-up-button');
      expect(toolbarOctaveUpButtonEl.length).toEqual(1);
    });

    it('should not be defined when no notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarOctaveUpButtonEl = toolbarEl.find('.sequencer__toolbar__octave-up-button');
      expect(toolbarOctaveUpButtonEl.length).toEqual(0);
    });

    it('should have correct props', () => {
      const onSelectedNotesOctaveUp = () => {};
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
        onSelectedNotesOctaveUp,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarOctaveUpButtonEl = toolbarEl.find('.sequencer__toolbar__octave-up-button');
      expect(toolbarOctaveUpButtonEl.prop('icon')).toEqual('arrow-up');
      expect(toolbarOctaveUpButtonEl.prop('onClick')).toEqual(onSelectedNotesOctaveUp);
      expect(toolbarOctaveUpButtonEl.prop('toolTip')).toEqual('Octave up');
    });
  });

  describe('child component __toolbar__down-octave-button', () => {
    it('should be defined when some notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarOctaveDownButtonEl = toolbarEl.find('.sequencer__toolbar__octave-down-button');
      expect(toolbarOctaveDownButtonEl.length).toEqual(1);
    });

    it('should not be defined when no notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarOctaveDownButtonEl = toolbarEl.find('.sequencer__toolbar__octave-down-button');
      expect(toolbarOctaveDownButtonEl.length).toEqual(0);
    });

    it('should have correct props', () => {
      const onSelectedNotesOctaveDown = () => {};
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
        onSelectedNotesOctaveDown,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarOctaveDownButtonEl = toolbarEl.find('.sequencer__toolbar__octave-down-button');
      expect(toolbarOctaveDownButtonEl.prop('icon')).toEqual('arrow-down');
      expect(toolbarOctaveDownButtonEl.prop('onClick')).toEqual(onSelectedNotesOctaveDown);
      expect(toolbarOctaveDownButtonEl.prop('toolTip')).toEqual('Octave down');
    });
  });

  describe('child component __toolbar__resize-dropdown', () => {
    it('should be defined when some notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarResizeDropdownEl = toolbarEl.find('.sequencer__toolbar__resize-dropdown');
      expect(toolbarResizeDropdownEl.length).toEqual(1);
    });

    it('should not be defined when no notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarResizeDropdownEl = toolbarEl.find('.sequencer__toolbar__resize-dropdown');
      expect(toolbarResizeDropdownEl.length).toEqual(0);
    });

    it('should have correct props', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarResizeDropdownEl = toolbarEl.find('.sequencer__toolbar__resize-dropdown');
      const { handleToolbarResizeDropdownSelectedIdChange } = component.instance();
      expect(toolbarResizeDropdownEl.prop('icon')).toEqual('long-arrow-right');
      expect(toolbarResizeDropdownEl.prop('items')).toEqual(getResizeLengths());
      expect(toolbarResizeDropdownEl.prop('onSelectedIdChange')).toEqual(handleToolbarResizeDropdownSelectedIdChange);
    });
  });

  describe('child component __toolbar__close-button', () => {
    it('should be defined when some notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarCloseButtonEl = toolbarEl.find('.sequencer__toolbar__close-button');
      expect(toolbarCloseButtonEl.length).toEqual(1);
    });

    it('should be defined when no notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarCloseButtonEl = toolbarEl.find('.sequencer__toolbar__close-button');
      expect(toolbarCloseButtonEl.length).toEqual(1);
    });

    it('should have correct props', () => {
      const onSequenceClose = () => {};
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
        onSequenceClose,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarCloseButtonEl = toolbarEl.find('.sequencer__toolbar__close-button');
      expect(toolbarCloseButtonEl.prop('icon')).toEqual('close');
      expect(toolbarCloseButtonEl.prop('onClick')).toEqual(onSequenceClose);
      expect(toolbarCloseButtonEl.prop('toolTip')).toEqual('Back to tracks');
    });
  });

  describe('child component __toolbar__select-tool-button', () => {
    it('should be defined when no notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarSelectToolButtonEl = toolbarEl.find('.sequencer__toolbar__select-tool-button');
      expect(toolbarSelectToolButtonEl.length).toEqual(1);
    });

    it('should not be defined when some notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarSelectToolButtonEl = toolbarEl.find('.sequencer__toolbar__select-tool-button');
      expect(toolbarSelectToolButtonEl.length).toEqual(0);
    });

    it('should have correct props', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarSelectToolButtonEl = toolbarEl.find('.sequencer__toolbar__select-tool-button');
      const { handleToolbarSelectToolButtonClick } = component.instance();
      expect(toolbarSelectToolButtonEl.prop('icon')).toEqual('mouse-pointer');
      expect(toolbarSelectToolButtonEl.prop('onClick')).toEqual(handleToolbarSelectToolButtonClick);
      expect(toolbarSelectToolButtonEl.prop('toolTip')).toEqual('Select');
    });
  });

  describe('child component __toolbar__draw-tool-button', () => {
    it('should be defined when no notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarDrawToolButtonEl = toolbarEl.find('.sequencer__toolbar__draw-tool-button');
      expect(toolbarDrawToolButtonEl.length).toEqual(1);
    });

    it('should not be defined when some notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarDrawToolButtonEl = toolbarEl.find('.sequencer__toolbar__draw-tool-button');
      expect(toolbarDrawToolButtonEl.length).toEqual(0);
    });

    it('should have correct props', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarDrawToolButtonEl = toolbarEl.find('.sequencer__toolbar__draw-tool-button');
      const { handleToolbarDrawToolButtonClick } = component.instance();
      expect(toolbarDrawToolButtonEl.prop('icon')).toEqual('pencil');
      expect(toolbarDrawToolButtonEl.prop('onClick')).toEqual(handleToolbarDrawToolButtonClick);
      expect(toolbarDrawToolButtonEl.prop('toolTip')).toEqual('Draw');
    });
  });

  describe('child component __toolbar__erase-tool-button', () => {
    it('should be defined when no notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarEraseToolButtonEl = toolbarEl.find('.sequencer__toolbar__erase-tool-button');
      expect(toolbarEraseToolButtonEl.length).toEqual(1);
    });

    it('should not be defined when some notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarEraseToolButtonEl = toolbarEl.find('.sequencer__toolbar__erase-tool-button');
      expect(toolbarEraseToolButtonEl.length).toEqual(0);
    });

    it('should have correct props', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarEraseToolButtonEl = toolbarEl.find('.sequencer__toolbar__erase-tool-button');
      const { handleToolbarEraseToolButtonClick } = component.instance();
      expect(toolbarEraseToolButtonEl.prop('icon')).toEqual('eraser');
      expect(toolbarEraseToolButtonEl.prop('onClick')).toEqual(handleToolbarEraseToolButtonClick);
      expect(toolbarEraseToolButtonEl.prop('toolTip')).toEqual('Erase');
    });
  });

  describe('child component __toolbar__pan-tool-button', () => {
    it('should be defined when no notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarPanToolButtonEl = toolbarEl.find('.sequencer__toolbar__pan-tool-button');
      expect(toolbarPanToolButtonEl.length).toEqual(1);
    });

    it('should not be defined when some notes are selected', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: true,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarPanToolButtonEl = toolbarEl.find('.sequencer__toolbar__pan-tool-button');
      expect(toolbarPanToolButtonEl.length).toEqual(0);
    });

    it('should have correct props', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        areSomeNotesSelected: false,
      }));
      const toolbarEl = component.find('.sequencer__toolbar').dive();
      const toolbarPanToolButtonEl = toolbarEl.find('.sequencer__toolbar__pan-tool-button');
      const { handleToolbarPanToolButtonClick } = component.instance();
      expect(toolbarPanToolButtonEl.prop('icon')).toEqual('hand-paper-o');
      expect(toolbarPanToolButtonEl.prop('onClick')).toEqual(handleToolbarPanToolButtonClick);
      expect(toolbarPanToolButtonEl.prop('toolTip')).toEqual('Pan');
    });
  });

  describe('element __content', () => {
    it('should be defined', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
      }));
      const contentEl = component.find('.sequencer__content');
      expect(contentEl.length).toEqual(1);
    });

    it('should invoke vertical scroll event with scroll offset in slots when scrolling vertically', () => {
      const onVerticalScroll = sinon.spy();
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        onVerticalScroll,
      }));
      const contentEl = component.find('.sequencer__content');
      contentEl.simulate('scroll', {
        target: {
          scrollTop: 495,
        },
      });
      expect(onVerticalScroll.lastCall.args).toEqual([12]);
    });

    it('should have correct ref function', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
      }));
      const contentEl = component.find('.sequencer__content');
      expect(contentEl.node.ref).toEqual(component.instance().setContentRef);
    });
  });

  describe('element __content__wrapper', () => {
    it('should be defined', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
      }));
      const contentWrapperEl = component.find('.sequencer__content__wrapper');
      expect(contentWrapperEl.length).toEqual(1);
    });
  });

  describe('child component KeysContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
      }));
      const keysContainerEl = component.find(KeysContainer);
      expect(keysContainerEl.length).toEqual(1);
    });
  });

  describe('child component GridContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
      }));
      const gridContainerEl = component.find(GridContainer);
      expect(gridContainerEl.length).toEqual(1);
    });

    it('should have correct value for sequencer content ref', () => {
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
      }));
      const gridContainerEl = component.find(GridContainer);
      expect(gridContainerEl.prop('sequencerContentRef')).toEqual(component.instance().contentRef);
    });
  });

  describe('method handleToolbarDrawToolButtonClick', () => {
    it('should invoke tool select event with draw tool-type', () => {
      const onToolSelect = sinon.spy();
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        onToolSelect,
      }));
      component.instance().handleToolbarDrawToolButtonClick();
      expect(onToolSelect.lastCall.args).toEqual([toolTypes.DRAW]);
    });
  });

  describe('method handleToolbarEraseToolButtonClick', () => {
    it('should invoke tool select event with erase tool-type', () => {
      const onToolSelect = sinon.spy();
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        onToolSelect,
      }));
      component.instance().handleToolbarEraseToolButtonClick();
      expect(onToolSelect.lastCall.args).toEqual([toolTypes.ERASE]);
    });
  });

  describe('method handleToolbarPanToolButtonClick', () => {
    it('should invoke tool select event with pan tool-type', () => {
      const onToolSelect = sinon.spy();
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        onToolSelect,
      }));
      component.instance().handleToolbarPanToolButtonClick();
      expect(onToolSelect.lastCall.args).toEqual([toolTypes.PAN]);
    });
  });

  describe('method handleToolbarResizeDropdownSelectedIdChange', () => {
    it('should invoke resize selected event with length', () => {
      const onSelectedNotesResize = sinon.spy();
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        onSelectedNotesResize,
      }));
      const length = 32;
      component.instance().handleToolbarResizeDropdownSelectedIdChange(length);
      expect(onSelectedNotesResize.lastCall.args).toEqual([length]);
    });
  });

  describe('method handleToolbarSelectToolButtonClick', () => {
    it('should invoke tool select event with select tool-type', () => {
      const onToolSelect = sinon.spy();
      const component = shallow(h(Sequencer, {
        ...getRequiredProps(),
        onToolSelect,
      }));
      component.instance().handleToolbarSelectToolButtonClick();
      expect(onToolSelect.lastCall.args).toEqual([toolTypes.SELECT]);
    });
  });
});

function getRequiredProps() {
  return {
    areSomeNotesSelected: false,
    onSelectedNotesDelete: () => {},
    onSelectedNotesDuplicate: () => {},
    onSelectedNotesResize: () => {},
    onSelectedNotesOctaveDown: () => {},
    onSelectedNotesOctaveUp: () => {},
    onSequenceClose: () => {},
    onToolSelect: () => {},
    onVerticalScroll: () => {},
    toolType: '',
  };
}
