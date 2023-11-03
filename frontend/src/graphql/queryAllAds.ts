import { gql } from '@apollo/client';

export const queryAllAds = gql`
  query allAds {
    items: allAds {
      id
      title
      picture
      price
    }
  }
`;
