import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://moaz:YRHnMG0wVyUPTCkR@cluster0.i73rgqx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
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
