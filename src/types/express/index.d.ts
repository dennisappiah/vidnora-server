// extending the request module
import * as express from "express";
import mongoose from "mongoose";

export interface GlobalUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: GlobalUser;
    }
  }
}
