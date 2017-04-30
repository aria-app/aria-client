// song = { measureCount: 4 };

class Song {
  constructor(song) {
    this.song = song;
  }
}

Song.create = song => new Song(song);

export default Song;
