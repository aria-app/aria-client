// track = { id: 'a', type: 'square' };

class Track {
  constructor(track) {
    this.track = track;
  }
}

Track.create = track => new Track(track);

export default Track;
