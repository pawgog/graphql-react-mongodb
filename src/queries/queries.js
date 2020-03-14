import { gql } from 'apollo-boost';

const getJourneysQuery = gql`
  {
    journeys {
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
  mutation($title: String!, $description: String!, $authorId: ID!) {
    addJourney(title: $title, description: $description, authorId: $authorId) {
      title
      id
    }
  }
`;

const updateJourneyMutation = gql`
  mutation($id: ID!, $title: String!, $description: String!) {
    updateJourney(id: $id, title: $title, description: $description) {
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
