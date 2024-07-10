import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "w7-route";

client
  .connect()
  .then(async () => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

export const db = client.db(dbName);
