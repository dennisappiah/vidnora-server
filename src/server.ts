import express from "express";
import { setUpDatabase } from "./database";
import dotenv from "dotenv";
import { handleErr } from "./middleware/handle-error";
import { setUpRoutes } from "./routes";

// load env variable
dotenv.config();

const PORT = process.env.PORT;

const server = express();

// use the body parser middleware
server.use(express.json());

// use error handling middleware
server.use(handleErr);

// set up routes
setUpRoutes(server);

// set up database
setUpDatabase();

server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
