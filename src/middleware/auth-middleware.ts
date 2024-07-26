import { Request, Response, NextFunction } from "express";
import Session from "../models/session";
import User from "../models/user"; // Import the User model
import { GlobalUser } from "../types/express"; // Import the GlobalUser type

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const routesToAuthenticate = [
    { method: "DELETE", path: "/api/logout-user" },
    { method: "POST", path: "/api/upload-video" },
    { method: "GET", path: "/api/videos" },
  ];

  // Check if the route requires authentication
  const needsAuth = routesToAuthenticate.some(
    (route) => route.method === req.method && route.path === req.path
  );

  if (needsAuth) {
    const cookie = req.headers.cookie;
    if (cookie) {
      const token = cookie.split("=")[1];
      const session = await Session.findOne({ token: token });

      if (session) {
        const user = await User.findById(session.userId);
        if (user) {
          req.user = user as GlobalUser;
          return next();
        }
      }
    }
    return res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
};

export default authenticate;
