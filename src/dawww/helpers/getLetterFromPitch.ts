export function getLetterFromPitch(pitch: number) {
  return ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'][
    pitch % 12
  ];
}
