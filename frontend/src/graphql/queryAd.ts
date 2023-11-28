import { gql } from '@apollo/client';

export const queryAd = gql`
  query ad($id: ID!) {
    item: ad(id: $id) {
      id
      price
      title
      description
      picture
      location
      owner
      category {
        id
        name
      }
    }
  }
`;
