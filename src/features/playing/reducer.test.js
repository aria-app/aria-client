import shared from '../shared';
import * as actions from './actions';
import * as helpers from './helpers';
import reducer from './reducer';

describe('Playing Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      channels: {
        byId: {},
        ids: [],
      },
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle CHANNEL_ADDED', () => {
    const channel = helpers.createChannel({
      id: 'track-1',
      synthType: shared.constants.synthTypes.SQUARE,
    });
    const previous = {
      channels: {
        byId: {},
        ids: [],
      },
    };
    const expected = {
      channels: {
        byId: {
          [channel.id]: channel,
        },
        ids: [channel.id],
      },
    };
    const action = {
      type: t.CHANNEL_ADDED,
      channel,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle CHANNELS_SET', () => {
    const channels = [
      helpers.createChannel({
        id: 'track-1',
        synthType: shared.constants.synthTypes.SQUARE,
      }),
    ];
    const previous = {
      channels: {
        byId: {},
        ids: [],
      },
    };
    const expected = {
      channels: {
        byId: {
          [channels[0].id]: channels[0],
        },
        ids: [channels[0].id],
      },
    };
    const action = {
      type: t.CHANNELS_SET,
      channels,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
