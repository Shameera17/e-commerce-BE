import express from "express";
import {
  createProduct,
  getProductById,
  getProductsBySellerId,
  getProductsByStatus,
  removeProduct,
  updateProduct,
} from "../controllers/product.controller";
import { authenticateToken } from "../middleware/authenticateToken.middleware";
const router = express.Router();

router.get("/all", getProductsByStatus);
router.get("/seller", authenticateToken, getProductsBySellerId);

router
  .route("/product")
  .post(authenticateToken, createProduct)
  .delete(authenticateToken, removeProduct)
  .get(getProductById)
  .put(authenticateToken, updateProduct);

export default router;
