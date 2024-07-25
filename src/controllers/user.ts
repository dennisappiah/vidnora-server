import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { hashPassword } from "../lib/utils";
import _ from "lodash";
import { validateUser } from "../lib/validate-request";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate request body
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, name, password } = req.body;

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
