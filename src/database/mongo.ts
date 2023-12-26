import { MongoClient, ServerApiVersion } from "mongodb";

const password = process.env.MONGODB_PASSWORD;

const uri = `mongodb+srv://castrodev37:${password}@cluster0.wccgpif.mongodb.net/?retryWrites=true&w=majority`;

const Mongo = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const client = Mongo;
const db = Mongo.db("lib");

console.log("connected on MongoDB!");

export { client, db };
