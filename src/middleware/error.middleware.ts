import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../utils/statusCode";

// catch all for routes that does not exist
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
//  errors from routes
const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode;
  let message = error.message;

  /* catch mongoose error
   * cast error : caused when type mismatch between the data being provided and
   *              the expected schema type for a field in a MongoDB document */
  if (error.name === "CastError" && error.kind === "ObjectId") {
    statusCode === 404;
    message = "Resource not found";
  } else if (error) {
    statusCode = statusCode === 200 ? HttpStatusCode.BAD_REQUEST : statusCode;
    message = `${error.message}`;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

export { errorHandler, notFound };
