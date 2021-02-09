export interface Listing {
  id: string;
  address: string;
  price: number;
  rating: number;
  title: string;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
}

export interface ListingsData {
  listings: Listing[];
}

export interface DeleteListingData {
  deleteListings: Listing;
}

export interface DeleteListingVariables {
  id: string;
}
