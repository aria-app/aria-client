import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { TrackerToolbar } from './tracker-toolbar';

describe('TrackerToolbar Component', () => {
  it('should be defined', () => {
    const component = shallow(h(TrackerToolbar, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });
  it('should have position top');
  it('should be alternate when selected sequence id is defined');
  it('should not be alternate when selected sequence id is not defined');
  describe('element __sequence-actions', () => {
    it('should be defined');
  });
  describe('child component __sequence-actions__open', () => {
    it('should have icon pencil');
    it('should have click event equal to selected sequence open event');
  });
  describe('child component __sequence-actions__delete', () => {
    it('should have icon trash');
    it('should have click event equal to selected sequence delete event');
  });
  describe('child component __sequence-actions__shorten', () => {
    it('should have icon long-arrow-left');
    it('should have click event equal to selected sequence shorten event');
  });
  describe('child component __sequence-actions__move-left', () => {
    it('should have icon arrow-left');
    it('should have click event equal to selected sequence move left event');
  });
  describe('child component __sequence-actions__move-right', () => {
    it('should have icon arrow-right');
    it('should have click event equal to selected sequence move right event');
  });
  describe('child component __sequence-actions__extend', () => {
    it('should have icon long-arrow-right');
    it('should have click event equal to selected sequence extend event');
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
