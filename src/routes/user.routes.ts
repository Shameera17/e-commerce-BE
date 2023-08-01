import express from "express";
import {
  authUser,
  getUser,
  registerUser,
  updateProfile,
} from "../controllers/user.controller";
import { authenticateToken } from "../middleware/authenticateToken.middleware";
const router = express.Router();

// Register a user
router.post("/register", registerUser);
// Authenticate a user and get token
router.post("/auth", authUser);

// Fetch user profile
// Update Profile
router
  .route("/profile")
  .get(authenticateToken, getUser)
  .put(authenticateToken, updateProfile);

export default router;
