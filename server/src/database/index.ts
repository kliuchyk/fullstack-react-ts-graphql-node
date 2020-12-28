import { MongoClient } from "mongodb";
import { DataBase } from "../lib/types";
import dotenv from "dotenv";

dotenv.config();

const USER = process.env.DATABASE_USER;
const DB_PASSWORD = process.env.DATABASE_USER_PASSWORD;
const DB_CLUSTER = process.env.DATABASE_CLUSTER;
const DB_NAME = process.env.DATABASE_NAME;
const DB_COLLECTION_NAME = "test_listings";

const url = `mongodb+srv://${USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<DataBase> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(DB_NAME);

  return {
    listings: db.collection(DB_COLLECTION_NAME),
  };
};
