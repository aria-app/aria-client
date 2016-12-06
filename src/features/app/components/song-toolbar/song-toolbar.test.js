import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import transport from '../../../transport';
import { SongToolbar } from './song-toolbar';

const { playbackStates } = transport.constants;

describe('SongToolbar Component', () => {
  it('should be defined', () => {
    const component = shallow(h(SongToolbar, {
      ...getDefaultProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should have correct value for position', () => {
    const component = shallow(h(SongToolbar, {
      ...getDefaultProps(),
    }));
    expect(component.prop('position')).toEqual('bottom');
  });

  describe('element __playback-buttons', () => {
    it('should be defined', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
      }));
      const playbackButtonsEl = component.dive().find('.song-toolbar__playback-buttons');
      expect(playbackButtonsEl.length).toEqual(1);
    });
  });

  describe('child component __playback-buttons__play-button', () => {
    it('should be defined', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
      }));
      const playbackButtonsPlayButtonEl = component.dive().find('.song-toolbar__playback-buttons__play-button');
      expect(playbackButtonsPlayButtonEl.length).toEqual(1);
    });

    it('should be active when playback state is started', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
        playbackState: playbackStates.STARTED,
      }));
      const playbackButtonsPlayButtonEl = component.dive().find('.song-toolbar__playback-buttons__play-button');
      expect(playbackButtonsPlayButtonEl.prop('isActive')).toEqual(true);
    });

    it('should not be active when playback state is not started', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
        playbackState: playbackStates.STOPPED,
      }));
      const playbackButtonsPlayButtonEl = component.dive().find('.song-toolbar__playback-buttons__play-button');
      expect(playbackButtonsPlayButtonEl.prop('isActive')).toEqual(false);
    });

    it('should receive correct props', () => {
      const onPlay = () => {};
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
        onPlay,
      }));
      const playbackButtonsPlayButtonEl = component.dive().find('.song-toolbar__playback-buttons__play-button');
      expect(playbackButtonsPlayButtonEl.prop('icon')).toEqual('play');
      expect(playbackButtonsPlayButtonEl.prop('onClick')).toEqual(onPlay);
    });
  });

  describe('child component __playback-buttons__pause-button', () => {
    it('should be defined', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
      }));
      const playbackButtonsPauseButtonEl = component.dive().find('.song-toolbar__playback-buttons__pause-button');
      expect(playbackButtonsPauseButtonEl.length).toEqual(1);
    });

    it('should be active when playback state is paused', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
        playbackState: playbackStates.PAUSED,
      }));
      const playbackButtonsPauseButtonEl = component.dive().find('.song-toolbar__playback-buttons__pause-button');
      expect(playbackButtonsPauseButtonEl.prop('isActive')).toEqual(true);
    });

    it('should not be active when playback state is not paused', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
        playbackState: playbackStates.STOPPED,
      }));
      const playbackButtonsPauseButtonEl = component.dive().find('.song-toolbar__playback-buttons__pause-button');
      expect(playbackButtonsPauseButtonEl.prop('isActive')).toEqual(false);
    });

    it('should receive correct props', () => {
      const onPause = () => {};
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
        onPause,
      }));
      const playbackButtonsPauseButtonEl = component.dive().find('.song-toolbar__playback-buttons__pause-button');
      expect(playbackButtonsPauseButtonEl.prop('icon')).toEqual('pause');
      expect(playbackButtonsPauseButtonEl.prop('onClick')).toEqual(onPause);
    });
  });

  describe('child component __playback-buttons__stop-button', () => {
    it('should be defined', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
      }));
      const playbackButtonsStopButtonEl = component.dive().find('.song-toolbar__playback-buttons__stop-button');
      expect(playbackButtonsStopButtonEl.length).toEqual(1);
    });

    it('should be active when playback state is stopped', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
        playbackState: playbackStates.STOPPED,
      }));
      const playbackButtonsStopButtonEl = component.dive().find('.song-toolbar__playback-buttons__stop-button');
      expect(playbackButtonsStopButtonEl.prop('isActive')).toEqual(true);
    });

    it('should not be active when playback state is not stopped', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
        playbackState: playbackStates.PAUSED,
      }));
      const playbackButtonsStopButtonEl = component.dive().find('.song-toolbar__playback-buttons__stop-button');
      expect(playbackButtonsStopButtonEl.prop('isActive')).toEqual(false);
    });

    it('should receive correct props', () => {
      const onStop = () => {};
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
        onStop,
      }));
      const playbackButtonsStopButtonEl = component.dive().find('.song-toolbar__playback-buttons__stop-button');
      expect(playbackButtonsStopButtonEl.prop('icon')).toEqual('stop');
      expect(playbackButtonsStopButtonEl.prop('onClick')).toEqual(onStop);
    });
  });

  describe('child component __clear-cache-button', () => {
    it('should be defined', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
      }));
      const clearCacheButtonEl = component.dive().find('.song-toolbar__clear-cache-button');
      expect(clearCacheButtonEl.length).toEqual(1);
    });

    it('should receive correct props', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
      }));
      const clearCacheButtonEl = component.dive().find('.song-toolbar__clear-cache-button');
      const { handleClearCacheClick } = component.instance();
      expect(clearCacheButtonEl.prop('onClick')).toEqual(handleClearCacheClick);
      expect(clearCacheButtonEl.prop('text')).toEqual('clear cache');
    });
  });

  describe('child component __set-bpm-button', () => {
    it('should be defined', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
      }));
      const setBPMButtonEl = component.dive().find('.song-toolbar__set-bpm-button');
      expect(setBPMButtonEl.length).toEqual(1);
    });

    it('should receive correct props', () => {
      const BPM = 134;
      const onBPMModalOpen = () => {};
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
        BPM,
        onBPMModalOpen,
      }));
      const setBPMButtonEl = component.dive().find('.song-toolbar__set-bpm-button');
      expect(setBPMButtonEl.prop('onClick')).toEqual(onBPMModalOpen);
      expect(setBPMButtonEl.prop('text')).toEqual(`BPM ${BPM}`);
    });
  });

  describe('child component __download-song-button', () => {
    it('should be defined', () => {
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
      }));
      const downloadSongButtonEl = component.dive().find('.song-toolbar__download-song-button');
      expect(downloadSongButtonEl.length).toEqual(1);
    });

    it('should receive correct props', () => {
      const stringifiedSong = '{ "id": "my-song" }';
      const component = shallow(h(SongToolbar, {
        ...getDefaultProps(),
        stringifiedSong,
      }));
      const downloadSongButtonEl = component.dive().find('.song-toolbar__download-song-button');
      expect(downloadSongButtonEl.prop('content')).toEqual(stringifiedSong);
      expect(downloadSongButtonEl.prop('filename')).toEqual('song.json');
      expect(downloadSongButtonEl.prop('text')).toEqual('Download Song');
    });
  });
});

function getDefaultProps() {
  return {
    BPM: 150,
    onBPMModalOpen: () => {},
    onPause: () => {},
    onPlay: () => {},
    onStop: () => {},
    playbackState: '',
    stringifiedSong: '',
  };
}
