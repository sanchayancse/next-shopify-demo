import gql from "graphql-tag";

export const REGISTRATION_QUERY = gql`
  mutation (
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phone: String!
    $acceptsMarketing: Boolean!
  ) {
    customerCreate(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        password: $password
        acceptsMarketing: $acceptsMarketing
      }
    ) {
      customer {
        firstName
        lastName
        id
        email
        updatedAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
