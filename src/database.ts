import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const setUpDatabase = () => {
  mongoose
    .connect(`${process.env.DB}`)
    .then(() => console.log(`Connected to mongo-database`))
    .catch((err) => console.log("Could not connect to MongoDb..", err));
};
