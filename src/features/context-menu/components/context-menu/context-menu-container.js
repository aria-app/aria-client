import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { ContextMenu } from '../context-menu/context-menu';

export const ContextMenuContainer = connect(state => ({
  items: selectors.getContextMenuItems(state),
  isOpen: selectors.getIsContextMenuOpen(state),
  position: selectors.getContextMenuPosition(state),
}), {
  onRequestClose: actions.contextMenuClosed,
  onSelect: actions.contextMenuItemSelected,
})(ContextMenu);
