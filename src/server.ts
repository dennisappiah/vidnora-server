import express from "express";

const PORT = 8060;
const server = express();

server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
