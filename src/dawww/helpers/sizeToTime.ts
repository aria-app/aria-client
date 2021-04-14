type SizeToTime = (size: number, toneAdapter: any) => number;

export const sizeToTime: SizeToTime = (size, toneAdapter) => {
  return (size + 1) * toneAdapter.Time('32n');
};
