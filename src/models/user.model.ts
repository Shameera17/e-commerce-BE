import { Document, model, Schema } from "mongoose";
import { IUser, UserDocument } from "../types";
import bcrypt from "bcryptjs";
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 *  pre and save are middleware functions that allow you to
 *  perform actions before and after a document is saved to the database.
 */

// Pre middleware executed before saving a document
UserSchema.pre("save", async function (next) {
  // if password is not changed in any way
  if (!this.isModified("password")) {
    // Continue with the save operation
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPasswords = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default model<UserDocument>("User", UserSchema);
