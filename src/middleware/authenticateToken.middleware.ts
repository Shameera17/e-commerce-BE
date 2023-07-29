import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import { NextFunction } from "express";
import messages from "../utils/resMessages";
import { HttpStatusCode } from "../utils/statusCode";

const authenticateToken = asyncHandler(
  async (req: any, res: any, next: NextFunction) => {
    /**
     * token assigned to authorisation object
     * ex: `Bearer ${token}`
     * therefore, split the authHeader
     */
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      try {
        const secretKey = process.env.JWT_SECRET;
        // Verify the token and extract the payload (user data) if valid
        const decoded: any = jwt.verify(token, secretKey!);
        // retrieve user
        // argument is passed to select to remove password
        req.user = await User.findById(decoded.userId).select("-password");
        // continue
        next();
      } catch (error) {
        res.status(HttpStatusCode.UNAUTHORIZED);
        throw new Error(messages.INVALID_TOKEN);
      }
    } else {
      res.status(HttpStatusCode.UNAUTHORIZED);
      throw new Error(messages.NOT_AUTHORISED);
    }
  }
);

export { authenticateToken };
