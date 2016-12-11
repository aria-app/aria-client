import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Modal } from './modal';

describe('Modal Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Modal));
    expect(component.length).toEqual(1);
  });

  it('should have display flex when open', () => {
    const component = shallow(h(Modal, {
      isOpen: true,
    }));
    expect(component.prop('style').display).toEqual('flex');
  });

  it('should have display none when not open', () => {
    const component = shallow(h(Modal, {
      isOpen: false,
    }));
    expect(component.prop('style').display).toEqual('none');
  });

  describe('element __overlay', () => {
    it('should be defined', () => {
      const component = shallow(h(Modal));
      const overlayEl = component.find('.modal__overlay');
      expect(overlayEl.length).toEqual(1);
    });
  });

  describe('element __overlay__window', () => {
    it('should be defined', () => {
      const component = shallow(h(Modal));
      const overlayWindowEl = component.find('.modal__overlay__window');
      expect(overlayWindowEl.length).toEqual(1);
    });
  });

  describe('element __overlay__window__header', () => {
    it('should be defined', () => {
      const component = shallow(h(Modal));
      const overlayWindowHeaderEl = component.find('.modal__overlay__window__header');
      expect(overlayWindowHeaderEl.length).toEqual(1);
    });
  });

  describe('element __overlay__window__header__text', () => {
    it('should be defined', () => {
      const component = shallow(h(Modal));
      const overlayWindowHeaderTextEl = component.find('.modal__overlay__window__header__text');
      expect(overlayWindowHeaderTextEl.length).toEqual(1);
    });

    it('should contain title text', () => {
      const titleText = 'Some Text';
      const component = shallow(h(Modal, {
        titleText,
      }));
      const overlayEl = component.find('.modal__overlay__window__header__text');
      expect(overlayEl.text()).toEqual(titleText);
    });
  });

  describe('element __overlay__window__content', () => {
    it('should be defined', () => {
      const component = shallow(h(Modal));
      const overlayWindowContentEl = component.find('.modal__overlay__window__content');
      expect(overlayWindowContentEl.length).toEqual(1);
    });

    it('should contain children', () => {
      const children = [
        h('div'),
      ];
      const component = shallow(h(Modal, {}, children));
      const overlayWindowContentEl = component.find('.modal__overlay__window__content');
      expect(overlayWindowContentEl.contains(children)).toEqual(true);
    });
  });

  describe('child component __overlay__window__actions', () => {
    it('should be defined', () => {
      const component = shallow(h(Modal));
      const overlayWindowActionsEl = component.find('.modal__overlay__window__actions');
      expect(overlayWindowActionsEl.length).toEqual(1);
    });
  });

  describe('child component __overlay__window__actions__action--cancel', () => {
    it('should be defined when cancel event is defined', () => {
      const component = shallow(h(Modal, {
        onCancel: () => {},
      }));
      const overlayWindowActionsEl = component.find('.modal__overlay__window__actions').dive();
      const overlayWindowActionsActionCancelEl = overlayWindowActionsEl
        .find('.modal__overlay__window__actions__action--cancel');
      expect(overlayWindowActionsActionCancelEl.length).toEqual(1);
    });

    it('should not be defined when cancel event is not defined', () => {
      const component = shallow(h(Modal));
      const overlayWindowActionsEl = component.find('.modal__overlay__window__actions').dive();
      const overlayWindowActionsActionCancelEl = overlayWindowActionsEl
        .find('.modal__overlay__window__actions__action--cancel');
      expect(overlayWindowActionsActionCancelEl.length).toEqual(0);
    });

    it('should have text equal to cancel text', () => {
      const cancelText = 'Some Text';
      const component = shallow(h(Modal, {
        onCancel: () => {},
        cancelText,
      }));
      const overlayWindowActionsEl = component.find('.modal__overlay__window__actions').dive();
      const overlayWindowActionsActionCancelEl = overlayWindowActionsEl
        .find('.modal__overlay__window__actions__action--cancel');
      expect(overlayWindowActionsActionCancelEl.prop('text')).toEqual(cancelText);
    });

    it('should have correct click handler', () => {
      const onCancel = () => {};
      const component = shallow(h(Modal, {
        onCancel,
      }));
      const overlayWindowActionsEl = component.find('.modal__overlay__window__actions').dive();
      const overlayWindowActionsActionCancelEl = overlayWindowActionsEl
        .find('.modal__overlay__window__actions__action--cancel');
      expect(overlayWindowActionsActionCancelEl.prop('onClick')).toEqual(onCancel);
    });
  });

  describe('child component __overlay__window__actions__action--confirm', () => {
    it('should be defined', () => {
      const component = shallow(h(Modal));
      const overlayWindowActionsEl = component.find('.modal__overlay__window__actions').dive();
      const overlayWindowActionsActionConfirmEl = overlayWindowActionsEl
        .find('.modal__overlay__window__actions__action--confirm');
      expect(overlayWindowActionsActionConfirmEl.length).toEqual(1);
    });

    it('should have text equal to confirm text', () => {
      const confirmText = 'Some Text';
      const component = shallow(h(Modal, {
        confirmText,
      }));
      const overlayWindowActionsEl = component.find('.modal__overlay__window__actions').dive();
      const overlayWindowActionsActionConfirmEl = overlayWindowActionsEl
        .find('.modal__overlay__window__actions__action--confirm');
      expect(overlayWindowActionsActionConfirmEl.prop('text')).toEqual(confirmText);
    });

    it('should have correct click handler', () => {
      const onConfirm = () => {};
      const component = shallow(h(Modal, {
        onConfirm,
      }));
      const overlayWindowActionsEl = component.find('.modal__overlay__window__actions').dive();
      const overlayWindowActionsActionConfirmEl = overlayWindowActionsEl
        .find('.modal__overlay__window__actions__action--confirm');
      expect(overlayWindowActionsActionConfirmEl.prop('onClick')).toEqual(onConfirm);
    });
  });
});
