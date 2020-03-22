import { gql } from 'apollo-boost';

const getJourneysQuery = gql`
  {
    journeys {
      date
      title
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getJourneyQuery = gql`
  query($id: ID) {
    journey(id: $id) {
      id
      date
      title
      description
      author {
        id
        name
        age
        journeys {
          title
          id
        }
      }
    }
  }
`;

const addJourneyMutation = gql`
  mutation(
    $date: String!
    $title: String!
    $description: String!
    $authorId: ID!
  ) {
    addJourney(
      date: $date
      title: $title
      description: $description
      authorId: $authorId
    ) {
      title
      id
    }
  }
`;

const updateJourneyMutation = gql`
  mutation($id: ID!, $date: String!, $title: String!, $description: String!) {
    updateJourney(
      id: $id
      date: $date
      title: $title
      description: $description
    ) {
      date
      title
      description
      id
    }
  }
`;

const removeJourneyMutation = gql`
  mutation($id: ID!) {
    removeJourney(id: $id) {
      id
    }
  }
`;

export {
  getJourneyQuery,
  getAuthorsQuery,
  getJourneysQuery,
  addJourneyMutation,
  updateJourneyMutation,
  removeJourneyMutation
};
