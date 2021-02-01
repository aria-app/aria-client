import { gql } from '@apollo/client';

export const CREATE_SONG = gql`
  mutation CreateSong($options: CreateSongInput!) {
    createSong(options: $options) {
      song {
        id
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
        voice {
          name
        }
      }
      user {
        id
        email
        firstName
        lastName
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
  mutation UpdateSong($id: ID!, $updates: UpdateSongInput!) {
    updateSong(id: $id, updates: $updates) {
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
