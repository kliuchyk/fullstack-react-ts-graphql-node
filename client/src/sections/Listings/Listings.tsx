import { server, useQuery } from "../../lib/api";
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
  const { data } = useQuery<ListingsData>(LISTINGS);

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: { id },
    });
  };

  const listingsList = data?.listings ? (
    <ul>
      {data.listings.map((listing) => (
        <li key={listing.id}>
          {listing.title}{" "}
          <button onClick={() => deleteListing(listing.id)}>delete</button>
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <div>
      <h2>Listings Header</h2>

      {data?.listings && listingsList}
    </div>
  );
};
