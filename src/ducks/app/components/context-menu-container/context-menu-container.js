import { connect } from 'react-redux';
import shared from 'ducks/shared';
import * as selectors from '../../selectors';

const { ContextMenu } = shared.components;

export const ContextMenuContainer = connect((state) => ({
  items: selectors.getContextMenuItems(state),
  isOpen: selectors.getIsContextMenuOpen(state),
  position: selectors.getContextMenuPosition(state),
}), {
  onRequestClose: shared.actions.contextMenuClosed,
  onSelect: shared.actions.contextMenuItemSelected,
})(ContextMenu);
