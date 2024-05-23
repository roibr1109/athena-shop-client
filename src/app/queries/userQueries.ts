import { gql } from 'apollo-angular';

export const USER_QUERY = gql`
      query signIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
            id
            username
            buyingHistory
            role
        }
    }`;

export const SIGN_UP_QUERY = gql`
    mutation createUser($username: String!, $password: String!) {
        createUser(username: $username, password: $password) {
            id
            username
            buyingHistory
            role
        }
    }`;

export const UPDATE_USER_MUTATION = gql`
        mutation updateUser($userId: ID!, $buyingHistory: [ID!]) {
          updateUser(userId: $userId, buyingHistory: $buyingHistory) {
            username
            id
            buyingHistory
            role
          }
    }`;
