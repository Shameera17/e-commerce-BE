import { ObjectId } from "bson";
import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserDocument extends IUser, Document {
  // Add your custom schema methods here
  matchPasswords(enteredPassword: string): Promise<string>;
}

export interface ILoggedInUser {
  _id: ObjectId;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IProduct {
  _id?: string;
  name: string;
  originalQuantity: number;
  remainingQuantity: number;
  imageFile: string;
  sellerId: ObjectId;
  price: number;
  status: "ACTIVE" | "INACTIVE";
}

export interface IOrder {
  orderNumber?: string;
  buyerId: ObjectId;
  productId: ObjectId;
  quantity: number;
  sellerId: ObjectId;
  totalAmount:number
  status: "ACTIVE" | "INACTIVE";
  paymentStatus: "DONE" | null;
}
