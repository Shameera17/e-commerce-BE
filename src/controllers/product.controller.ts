import { ObjectId } from "bson";
import asyncHandler from "express-async-handler";
import _ from "lodash";
import ProductModal from "../models/product.modal";
import { IProduct } from "../types";
import { HttpStatusCode } from "../utils/statusCode";

const createProduct = asyncHandler(async (request, response) => {
  try {
    const data = await request.body;
    const sellerId = data?.sellerId;
    const productImage = data?.imageFile;

    const product: IProduct = {
      name: data?.name,
      originalQuantity: Number(data?.quantity),
      remainingQuantity: Number(data?.quantity),
      imageFile: productImage,
      sellerId: new ObjectId(sellerId),
      price: Number(data?.price),
      status: "ACTIVE",
    };

    const productObj = new ProductModal(product);
    const result = await ProductModal.create(productObj);
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
const getProductsByStatus = asyncHandler(async (request, response) => {
  try {
    const status = request.query.status;
    const products = await ProductModal.find({ status: status });
    const reverseProducts = _.reverse(
      products.filter((item) => item.remainingQuantity > 0)
    );
    response.status(HttpStatusCode.OK).json({ products: reverseProducts });
  } catch (error: any) {
    response.status(HttpStatusCode.BAD_REQUEST);
    throw new Error(error.message);
  }
});
const getProductsBySellerId = asyncHandler(async (request: any, response) => {
  try {
    const user = request.user;
    const products = await ProductModal.find({ sellerId: user?._id });
    const reverseProducts = _.reverse(products);
    response.status(HttpStatusCode.OK).json({ products: reverseProducts });
  } catch (error: any) {
    response.status(HttpStatusCode.BAD_REQUEST);
    throw new Error(error.message);
  }
});
const updateProduct = asyncHandler(async (request, response) => {
  const sellerId = request.body.sellerId;
  const filter = { sellerId };
  let product = await ProductModal.findOneAndUpdate(
    filter,
    {
      name: request.body.name,
    },
    {
      new: true,
    }
  );
  if (product) {
    response.status(HttpStatusCode.OK).json({ message: "Product updated!" });
  } else {
    response.status(HttpStatusCode.BAD_REQUEST);
    throw new Error("Product update failed!");
  }
});
const removeProduct = asyncHandler(async (request, response) => {
  const sellerId = request.body.sellerId;
  const filter = { sellerId };
  let product = await ProductModal.findOneAndUpdate(
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
const getProductById = asyncHandler(async (request, response) => {
  try {
    const productId = request.body._id;
    const product = await ProductModal.find({ _id: productId });
    response.status(HttpStatusCode.OK).json({ product: product });
  } catch (error: any) {
    response.status(HttpStatusCode.BAD_REQUEST);
    throw new Error(error.message);
  }
});
export {
  createProduct,
  getProductById,
  getProductsBySellerId,
  getProductsByStatus,
  removeProduct,
  updateProduct,
};
