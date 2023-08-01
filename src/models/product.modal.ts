import { model, Schema } from "mongoose";
import { IProduct } from "../types";

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    originalQuantity: {
      type: Number,
      required: true,
    },
    remainingQuantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    imageFile: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default model<IProduct>("Product", ProductSchema);
