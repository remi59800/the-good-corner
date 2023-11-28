import { gql } from '@apollo/client';

export const queryAllAds = gql`
  query allAds($where: AdsWhere) {
    items: allAds(where: $where) {
      id
      title
      picture
      price
      category {
        id
      }
    }
  }
`;
