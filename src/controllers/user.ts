import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { generateToken, hashPassword, verifyPassword } from "../lib/utils";
import _ from "lodash";
import { validateUser, validateAuth } from "../lib/validate-request";
import { CreateUserRequest, LoginRequest } from "../dtos/user";

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

    // save new user
    await newUser.save();

    res.status(201).json({
      status: "success",
      message: _.pick(newUser, ["_id", "name", "email"]),
    });
  } catch (err) {
    next(err);
  }
};

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  res.status(200).json({ status: "success", token: token });
};

export { registerUser, authenticateUser };
