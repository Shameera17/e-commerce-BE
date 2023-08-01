import { model, Schema } from "mongoose";
import shortid from "shortid";
import { IOrder } from "../types";
const OrderSchema = new Schema<IOrder>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
      required: true,
      default: shortid.generate,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    // Generate a unique order number using shortid.
    this.orderNumber = shortid.generate();
  }
  next();
});
export default model<IOrder>("Order", OrderSchema);
