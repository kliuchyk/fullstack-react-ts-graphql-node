import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Listing {
    id: ID!
    title: String!
    address: String!
    image: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
  }

  type Query {
    listings: [Listing!]!
  }

  type Mutation {
    deleteListings(id: ID!): Listing!
  }
`;
