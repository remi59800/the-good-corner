import { gql } from '@apollo/client';

export const queryAllCategories = gql`
  query allCategories {
    items: allCategories {
      id
      name
    }
  }
`;
