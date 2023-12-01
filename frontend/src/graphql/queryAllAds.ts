import { gql } from '@apollo/client';

export const queryAllAds = gql`
  query allAds($skip: Int, $take: Int, $where: AdsWhere) {
    items: allAds(skip: $skip, take: $take, where: $where) {
      id
      title
      picture
      price
      category {
        id
      }
    }
    count: allAdsCount(where: $where)
  }
`;
