import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} from "graphql";

import { listings } from "./listings";

const Listing = new GraphQLObjectType({
  name: "Listing",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    address: {
      type: GraphQLNonNull(GraphQLString),
    },
    price: {
      type: GraphQLNonNull(GraphQLInt),
    },
    image: {
      type: GraphQLNonNull(GraphQLString),
    },
    numOfGuests: {
      type: GraphQLNonNull(GraphQLInt),
    },
    numOfBeds: {
      type: GraphQLNonNull(GraphQLInt),
    },
    numOfBaths: {
      type: GraphQLNonNull(GraphQLInt),
    },
    rating: {
      type: GraphQLNonNull(GraphQLInt),
    },
  },
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    listings: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Listing))),
      resolve: () => listings,
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    deleteListings: {
      type: GraphQLNonNull(Listing),
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (_root, { id }) => {
        for (let i = 0; i < listings.length; i++) {
          if (listings[i].id === id) {
            return listings.splice(i, 1)[0];
          }
        }

        throw new Error("failed to delete listing");
      },
    },
  },
});

export const schema = new GraphQLSchema({ query, mutation });
