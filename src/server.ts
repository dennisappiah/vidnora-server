import express from "express";
import { setUpDatabase } from "./database";
import dotenv from "dotenv";
import { handleErr } from "./middleware/handle-error";
import { setUpRoutes } from "./routes";
import cookieParser from "cookie-parser";
import authenticate from "./middleware/auth-middleware";

// load env variable
dotenv.config();

const PORT = process.env.PORT || 3002;

const server = express();

// Middleware for parsing JSON and cookies
server.use(express.json());
server.use(cookieParser());

// Authentication middleware
server.use(authenticate);

// Set up routes
setUpRoutes(server);

// Global error handling
server.use(handleErr);

// Set up database
setUpDatabase();

server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
