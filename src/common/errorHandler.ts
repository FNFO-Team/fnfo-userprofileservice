import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Internal server error",
  });
};
