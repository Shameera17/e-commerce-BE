import express from "express";
import {
  cancelOrderByBuyer,
  createOrder,
  getOrderById,
  getOrderByStatusByBuyer,
  getOrderByStatusBySeller,
} from "../controllers/order.controller";
import { authenticateToken } from "../middleware/authenticateToken.middleware";
const router = express.Router();

router.get("/buyer", getOrderByStatusByBuyer);
router.get("/seller", getOrderByStatusBySeller);

router
  .route("/product")
  .post(authenticateToken, createOrder)
  .get(authenticateToken, getOrderById)
  .put(authenticateToken, cancelOrderByBuyer);

export default router;
