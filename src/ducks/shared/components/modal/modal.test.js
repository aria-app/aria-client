import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { Modal } from './modal';

describe('Modal Component', () => {
  it('should be defined', () => {
    const component = mount(h(Modal));
    expect(component).toBeDefined();
  });

  describe('header text', () => {
    it('should contain title text', () => {
      const titleText = 'Some Title';
      const component = mount(h(Modal, {
        titleText,
      }));
      const headerTextElement = component.find('.modal__header__text');
      expect(headerTextElement.text().trim()).toEqual(titleText);
    });
  });

  describe('action cancel', () => {
    it('should be defined when onCancel is defined', () => {
      const component = mount(h(Modal, {
        onCancel: () => {},
      }));
      const actionCancelElement = component.find('.modal__action--cancel');
      expect(actionCancelElement.length).toEqual(1);
    });

    it('should not be defined when onCancel is not defined', () => {
      const component = mount(h(Modal));
      const actionCancelElement = component.find('.modal__action--cancel');
      expect(actionCancelElement.length).toEqual(0);
    });
  });
});
