import { ObjectId } from "bson";
import asyncHandler from "express-async-handler";
import _ from "lodash";
import OrderModal from "../models/order.modal";
import { IOrder } from "../types";
import { HttpStatusCode } from "../utils/statusCode";

const createOrder = asyncHandler(async (request, response) => {
  try {
    const data = await request.body;
    const sellerId = data?.sellerId;
    const buyerId = data?.buyerId;
    const productId = data?.productId;

    const order: IOrder = {
      productId: new ObjectId(productId),
      quantity: 0,
      sellerId: new ObjectId(sellerId),
      status: "ACTIVE",
      paymentStatus: null,
      buyerId: new ObjectId(buyerId),
      totalAmount: data?.price * data?.quantity,
    };

    const orderObj = new OrderModal(order);
    const result = await OrderModal.create(orderObj);
    if (result) {
      response.status(HttpStatusCode.OK).json({ message: "Product created!" });
    } else {
      response.status(HttpStatusCode.BAD_REQUEST);
      throw new Error("Product creation failed!");
    }
  } catch (error) {
    response.status(HttpStatusCode.BAD_REQUEST);
    throw new Error("Product creation failed!");
  }
});
const getOrderByStatusByBuyer = asyncHandler(async (request, response) => {
  try {
    const status = request.body.status;
    const buyerId = request.body?.buyerId;

    const orders = await OrderModal.find({ status: status, buyerId: buyerId });
    const reverseOrders = _.reverse(orders);
    response.status(HttpStatusCode.OK).json({ products: reverseOrders });
  } catch (error: any) {
    response.status(HttpStatusCode.BAD_REQUEST);
    throw new Error(error.message);
  }
});
const getOrderByStatusBySeller = asyncHandler(async (request, response) => {
  try {
    const status = request.body.status;
    const sellerId = request.body?.sellerId;

    const orders = await OrderModal.find({
      status: status,
      sellerId: sellerId,
    });
    const reverseOrders = _.reverse(orders);
    response.status(HttpStatusCode.OK).json({ products: reverseOrders });
  } catch (error: any) {
    response.status(HttpStatusCode.BAD_REQUEST);
    throw new Error(error.message);
  }
});

const cancelOrderByBuyer = asyncHandler(async (request, response) => {
  const sellerId = request.body.buyerId;
  const filter = { sellerId };
  let product = await OrderModal.findOneAndUpdate(
    filter,
    {
      status: "INACTIVE",
    },
    {
      new: true,
    }
  );
  if (product) {
    response.status(HttpStatusCode.OK).json({ message: "Product removed!" });
  } else {
    response.status(HttpStatusCode.BAD_REQUEST);
    throw new Error("Product removal failed!");
  }
});
const getOrderById = asyncHandler(async (request, response) => {
  try {
    const orderId = request.body._id;
    const product = await OrderModal.find({ _id: orderId });
    response.status(HttpStatusCode.OK).json({ product: product });
  } catch (error: any) {
    response.status(HttpStatusCode.BAD_REQUEST);
    throw new Error(error.message);
  }
});
export {
  cancelOrderByBuyer,
  createOrder,
  getOrderById,
  getOrderByStatusByBuyer,
  getOrderByStatusBySeller,
};
