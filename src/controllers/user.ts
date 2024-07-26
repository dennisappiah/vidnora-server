import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { generateToken, hashPassword, verifyPassword } from "../lib/utils";
import _ from "lodash";
import { validateUser, validateAuth } from "../lib/validate-request";
import { CreateUserRequest, LoginRequest } from "../dtos/user";
import Session from "../models/session";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate request body
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, name, password } = req.body as CreateUserRequest;

    // check if user is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("User already registered");

    // create new user
    const newUser = new User({
      name,
      email,
      password,
    });

    // hash password
    newUser.password = await hashPassword(newUser.password);

    // save new user to db
    await newUser.save();

    res.status(201).json({
      status: "success",
      message: _.pick(newUser, ["_id", "name", "email"]),
    });
  } catch (err) {
    next(err);
  }
};

const logInUser = async (req: Request, res: Response, next: NextFunction) => {
  // validate request body
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body as LoginRequest;

  //checking for invalid user email
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password");

  // checking for invalid password
  const validPassword = await verifyPassword(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  // generate token for user
  const token = generateToken(user);

  // create new session
  const session = new Session({
    userId: user.id,
    token: token,
  });

  // save session to db
  await session.save();

  res.setHeader("Set-Cookie", `token=${token}; Path=/;`);
  res.status(200).json({ status: "Logged in successfully!", token: token });
};

const logOutUser = async (req: Request, res: Response, next: NextFunction) => {
  // Find and delete the session
  const session = await Session.findOneAndDelete({ userId: req.user?._id });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  // Clear the authentication token
  res.setHeader(
    "Set-Cookie",
    `token=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`
  );

  res.status(200).json({ message: "Logged out successfully!" });
};

export { registerUser, logInUser, logOutUser };
