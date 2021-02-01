import { gql } from '@apollo/client';

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
      }
      position
      track {
        id
        song {
          name
          user {
            id
          }
        }
      }
    }
  }
`;

/*
  Format that Dawww expects:
  {
    bpm
    dateModified
    id
    measureCount
    name
    notes: {
      [noteId]: {
        id
        points: [
          { x, y }
        ]
        sequenceId
      }
    }
    sequences: {
      [sequenceId]: {
        id
        measureCount
        position
        trackId
      }
    }
    tracks: {
      [trackId]: {
        id
        isMuted
        isSoloing
        voice
        volume
      }
    }
  }
*/

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

export const GET_TRACK = gql`
  query GetTrack($id: ID!) {
    track(id: $id) {
      id
      position
      sequences {
        id
        measureCount
        position
      }
      song {
        id
        name
        user {
          id
        }
      }
      voice {
        id
        name
      }
      volume
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
      sequence {
        id
        measureCount
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
        volume
      }
      success
    }
  }
`;
