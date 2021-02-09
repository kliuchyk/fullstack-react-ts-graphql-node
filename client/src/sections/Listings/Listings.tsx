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
  const { data, loading, refetch, error } = useQuery<ListingsData>(LISTINGS);

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: { id },
    });
    refetch();
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

  if (loading) {
    return <h2>Loading...</h2>;
  }


  if (error) {
    <h2>We've got an error! Please try again later...</h2>
  }

  return (
    <div>
      <h2>Listings Header</h2>

      {data?.listings && listingsList}
    </div>
  );
};
