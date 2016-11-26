import { connect } from 'react-redux';
import shared from '../../../shared';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { ContextMenu } from '../context-menu/context-menu';

export const ContextMenuContainer = connect(state => ({
  isOpen: selectors.getIsContextMenuOpen(state),
  items: selectors.getContextMenuItems(state),
  position: selectors.getContextMenuPosition(state),
  windowHeight: shared.selectors.getWindowHeight(state),
  windowWidth: shared.selectors.getWindowWidth(state),
}), {
  onIsOpenChange: actions.contextMenuClosed,
  onSelect: actions.contextMenuItemSelected,
})(ContextMenu);
