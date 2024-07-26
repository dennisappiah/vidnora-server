import { Express } from "express";
import * as User from "./controllers/user";

export const setUpRoutes = (server: Express) => {
  // ----- USER ROUTES ---------------
  server.post("/api/create-user", User.registerUser);
  server.post("/api/login-user", User.authenticateUser);
  server.post("/api/logout-user", User.logUserOut);
};
