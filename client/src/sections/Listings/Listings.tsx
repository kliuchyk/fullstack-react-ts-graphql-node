import React from "react";
import { server } from "../../lib/api";
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from "./types";

const LISTINGS = `
  query Listings {
    listings {
      id,
      address,
      price,
      rating,
      title, 
      numOfGuests,
      numOfBeds,
      numOfBaths,
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListings(id: $id) {
      id,
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = (props: Props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    return data;
  };

  const deleteListings = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({ query: DELETE_LISTING, variables: { id: "5fe9dfcc9391bc97bec2d7a9" } });
  };

  return (
    <div>
      <h2>Listings Header</h2>
      <button onClick={fetchListings}>Query Listings!</button>
      <button onClick={deleteListings}>Delete a listing!</button>
    </div>
  );
};
