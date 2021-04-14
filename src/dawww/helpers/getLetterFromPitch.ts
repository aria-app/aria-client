type GetLetterFromPitch = (pitch: number) => string;

export const getLetterFromPitch: GetLetterFromPitch = (pitch) => {
  return ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'][
    pitch % 12
  ];
};
