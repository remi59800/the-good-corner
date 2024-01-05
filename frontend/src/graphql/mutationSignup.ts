import { gql } from '@apollo/client';

export const mutationSignup = gql`
  mutation signUp($data: UserCreateInput!) {
    item: signUp(data: $data) {
      id
    }
  }
`;
