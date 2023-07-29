import { ObjectId } from "bson";
import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
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
  id: string;
  name: string;
  originalQuantity: number;
  remainingQuantity: number;
}

export interface IOrder {
  orderNumber: number;
  product: ObjectId;
}
