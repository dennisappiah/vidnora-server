import { Request, Response, NextFunction } from "express";

export const handleErr = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
};
