import { Collection, ObjectID } from "mongodb";

export interface Listing {
  _id: ObjectID;
  title: string;
  address: string;
  image: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export interface DataBase {
  listings: Collection<Listing>;
}
