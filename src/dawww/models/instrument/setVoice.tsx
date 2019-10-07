import invokeArgs from 'lodash/fp/invokeArgs';

export function setVoice(instrument, value) {
  invokeArgs(
    'set',
    [
      {
        oscillator: {
          type: value.toLowerCase(),
        },
      },
    ],
    instrument,
  );
}
