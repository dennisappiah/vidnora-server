import express from "express";
import { setUpDatabase } from "./database";
import dotenv from "dotenv";

const PORT = process.env.PORT || 8060;

const server = express();
dotenv.config();

setUpDatabase();

server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
