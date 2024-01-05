import { gql } from '@apollo/client';

export const mutationSignOut = gql`
  mutation signOut {
    signOut
  }
`;
