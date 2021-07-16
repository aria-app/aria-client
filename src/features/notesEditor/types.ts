export interface PositionBounds {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

export interface SizeBounds {
  left: number;
  right: number;
}

export type ToolType = 'DRAW' | 'ERASE' | 'SELECT' | 'PAN';
