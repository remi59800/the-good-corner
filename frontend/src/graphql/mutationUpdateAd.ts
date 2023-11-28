import { gql } from '@apollo/client';

export const mutationUpdateAd = gql`
  mutation Mutation($id: ID!, $data: AdUpdateInput!) {
    updateAd(id: $id, data: $data) {
      id
    }
  }
`;
