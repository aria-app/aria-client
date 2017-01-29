import { flow, identity, some } from 'lodash/fp';
import { NAME } from './constants';

const get = state => state[NAME];

export const getContextMenuItems = state => get(state).contextMenuItems;
export const getContextMenuPosition = state => get(state).contextMenuPosition;

export const getIsContextMenuOpen =
  flow(
    getContextMenuItems,
    some(identity),
  );
