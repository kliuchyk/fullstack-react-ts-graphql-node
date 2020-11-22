import { IResolvers } from 'apollo-server-express';

import { listings } from "../listings";

export const resolvers: IResolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    listings: () => {
      return listings;
    },
  },
  Mutation: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    deleteListings: (_root: undefined, { id }: { id: string }) => {
      for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
          return listings.splice(i, 1)[0];
        }
      }

      throw new Error("failed to delete listing");
    },
  },
};
