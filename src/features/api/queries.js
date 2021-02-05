import { gql } from '@apollo/client';
export const CREATE_SEQUENCE = gql`
  mutation CreateSequence($input: CreateSequenceInput!) {
    createSequence(input: $input) {
      sequence {
        id
        measureCount
        notes {
          id
          points {
            x
            y
          }
        }
        position
        track {
          id
        }
      }
      success
    }
  }
`;

export const CREATE_SONG = gql`
  mutation CreateSong($options: CreateSongInput!) {
    createSong(options: $options) {
      song {
        dateModified
        id
        name
        trackCount
      }
      success
    }
  }
`;

export const CREATE_TRACK = gql`
  mutation CreateTrack($input: CreateTrackInput!) {
    createTrack(input: $input) {
      message
      success
      track {
        id
        position
        sequences {
          id
          measureCount
          notes {
            id
            points {
              x
              y
            }
            sequence {
              id
            }
          }
          position
          track {
            id
          }
        }
        voice {
          id
          name
          toneOscillatorType
        }
        volume
      }
    }
  }
`;

export const DELETE_SEQUENCE = gql`
  mutation DeleteSequence($id: ID!) {
    deleteSequence(id: $id) {
      success
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      success
    }
  }
`;

export const DELETE_TRACK = gql`
  mutation DeleteTrack($id: ID!) {
    deleteTrack(id: $id) {
      success
    }
  }
`;

export const DUPLICATE_SEQUENCE = gql`
  mutation DuplicateSequence($id: ID!) {
    duplicateSequence(id: $id) {
      message
      sequence {
        id
        measureCount
        notes {
          id
          points {
            x
            y
          }
          sequence {
            id
          }
        }
        position
        track {
          id
        }
      }
      success
    }
  }
`;

export const GET_SEQUENCE = gql`
  query GetSequence($id: ID!) {
    sequence(id: $id) {
      id
      measureCount
      notes {
        id
        points {
          x
          y
        }
        sequence {
          id
        }
      }
      position
      track {
        id
      }
    }
  }
`;

export const GET_SONG_SEQUENCES = gql`
  query GetSongSequences($songId: ID!) {
    songSequences(songId: $songId) {
      id
      measureCount
      notes {
        id
        points {
          x
          y
        }
      }
      position
      track {
        id
      }
    }
  }
`;

export const GET_SONG = gql`
  query GetSong($id: ID!) {
    song(id: $id) {
      bpm
      dateModified
      id
      measureCount
      name
      tracks {
        id
        position
        sequences {
          id
          measureCount
          notes {
            id
            points {
              x
              y
            }
            sequence {
              id
            }
          }
          position
          track {
            id
          }
        }
        voice {
          id
          name
          toneOscillatorType
        }
        volume
      }
      user {
        id
      }
    }
  }
`;

export const GET_SONGS = gql`
  query GetSongs(
    $limit: Int
    $page: Int
    $search: String
    $sort: String
    $sortDirection: String
    $userId: ID
  ) {
    songs(
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      sortDirection: $sortDirection
      userId: $userId
    ) {
      data {
        dateModified
        id
        name
        trackCount
      }
      meta {
        currentPage
        itemsPerPage
        totalItemCount
      }
    }
  }
`;

export const GET_TRACKS = gql`
  query GetTracks($songId: ID!) {
    tracks(songId: $songId) {
      id
      position
      song {
        id
      }
      voice {
        id
        name
        toneOscillatorType
      }
      volume
    }
  }
`;

export const GET_VOICES = gql`
  query GetVoices {
    voices {
      id
      name
      toneOscillatorType
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      expiresAt
      success
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      email
      firstName
      id
      isAdmin
      lastName
    }
  }
`;

export const UPDATE_NOTES_POINTS = gql`
  mutation UpdateNotesPoints($input: UpdateNotesPointsInput!) {
    updateNotesPoints(input: $input) {
      notes {
        id
        points {
          x
          y
        }
      }
      success
    }
  }
`;

export const UPDATE_SEQUENCE = gql`
  mutation UpdateSequence($input: UpdateSequenceInput!) {
    updateSequence(input: $input) {
      message
      sequence {
        id
        measureCount
        notes {
          id
          points {
            x
            y
          }
          sequence {
            id
          }
        }
        position
        track {
          id
        }
      }
      success
    }
  }
`;

export const UPDATE_SONG = gql`
  mutation UpdateSong($input: UpdateSongInput!) {
    updateSong(input: $input) {
      song {
        bpm
        dateModified
        id
        measureCount
        name
      }
      success
    }
  }
`;

export const UPDATE_TRACK = gql`
  mutation UpdateTrack($input: UpdateTrackInput!) {
    updateTrack(input: $input) {
      track {
        id
        position
        song {
          id
        }
        voice {
          id
          name
          toneOscillatorType
        }
        volume
      }
      success
    }
  }
`;
