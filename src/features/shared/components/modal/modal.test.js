import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Modal } from './modal';

describe('Modal Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Modal));
    expect(component.length).toEqual(1);
  });
  it('should have display flex when open');
  it('should have display none when not open');
  describe('element __overlay', () => {
    it('should be defined');
  });
  describe('element __overlay__window', () => {
    it('should be defined');
  });
  describe('element __overlay__window__header', () => {
    it('should be defined');
  });
  describe('element __overlay__window__header__text', () => {
    it('should be defined');
    it('should contain title text');
  });
  describe('element __overlay__window__content', () => {
    it('should be defined');
    it('should contain children');
  });
  describe('child component __overlay__window__actions', () => {
    it('should be defined');
  });
  describe('child component __overlay__window__actions__action--cancel', () => {
    it('should be defined when cancel event is defined');
    it('should not be defined when cancel event is not defined');
    it('should have text equal to cancel text');
    it('should have correct click handler');
  });
  describe('child component __overlay__window__actions__action--confirm', () => {
    it('should be defined');
    it('should have text equal to confirm text');
    it('should have correct click handler');
  });
});
