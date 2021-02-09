import { useQuery, useMutation } from "../../lib/api";
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

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ id });
    refetch();
  };

  const listings = data?.listings ? (
    <ul>
      {data.listings.map((listing) => (
        <li key={listing.id}>
          {listing.title}{" "}
          <button onClick={() => handleDeleteListing(listing.id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  ) : null;

  if (loading || deleteListingLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    <h2>We've got an error! Please try again later...</h2>;
  }

  const deleteListingErrorMessage = deleteListingError ? (
    <h3>An error occurred while listing deletion!</h3>
  ) : null;

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h3>Processing listing deletion!</h3>
  ) : null;

  return (
    <div>
      <h2>Listings Header</h2>
      {listings}
      {deleteListingErrorMessage}
      {deleteListingLoadingMessage}
    </div>
  );
};
