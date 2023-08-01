// asyncHandler passes error on to the error handling route
import asyncHandler from "express-async-handler";
import User from "../models/user.model";
import { ILoggedInUser } from "../types";
import generateToken from "../utils/generateToken";
import messages from "../utils/resMessages";
import { HttpStatusCode } from "../utils/statusCode";

const registerUser = asyncHandler(async (request, response) => {
  const { name, email, password, role } = request.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    response.status(HttpStatusCode.ALREADY_EXIST);
    throw new Error(messages.USER_EXISTS);
  }

  const createdUser = await User.create({ name, email, password, role });
  if (createdUser) {
    const token = generateToken({
      userId: createdUser._id,
      email: createdUser.email,
      role: createdUser.role,
    });
    response.status(HttpStatusCode.POST_OK).json({
      data: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
      },
      // Sending the token as a JSON object in the response body
      token,
      message: messages.SUCCESS,
    });
  } else {
    response.status(400);
    throw new Error(messages.INVALID_DATA);
  }
});

const authUser = asyncHandler(async (request: any, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });
  // check whether user exists and password entered is matched against saved password
  if (user && (await user.matchPasswords(password))) {
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });
    response.status(HttpStatusCode.POST_OK).json({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      // Sending the token as a JSON object in the response body
      token,
      message: messages.SUCCESS,
    });
  } else {
    response.status(HttpStatusCode.UNAUTHORIZED);
    throw new Error(messages.INVALID);
  }
});

const getUser = asyncHandler(async (request: any, response) => {
  const user: ILoggedInUser = request.user!;
  const existingUser = await User.findById(user._id).select("-password");
  if (existingUser)
    response
      .status(HttpStatusCode.OK)
      .json({ message: "Success", user: existingUser });
  else
    response
      .status(HttpStatusCode.NOT_FOUND)
      .json({ message: messages.USER_NOT_FOUND });
});

const updateProfile = asyncHandler(async (request: any, response) => {
  const user = request.user!;
  const { name, email, password } = request.body;
  const existingUser = await User.findById(user._id);
  if (existingUser?._id) {
    existingUser.name = name || existingUser.name;
    existingUser.email = email || existingUser.email;
    if (password) existingUser.password = password;

    const updatedUser = await existingUser.save();
    const token = generateToken({
      userId: updatedUser._id,
      email: updatedUser.email,
      role: updatedUser.role,
    });
    response.status(200).json({ updatedUser, token });
  } else {
    response.status(HttpStatusCode.NOT_FOUND);
    throw new Error(messages.USER_NOT_FOUND);
  }
});

export { authUser, getUser, registerUser, updateProfile };
