import Joi from "joi";
import { CreateUserRequest, LoginRequest } from "../dtos/user";

const validateUser = (user: CreateUserRequest) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    // joi-password complexity for complex passwords
    password: Joi.string().min(5).max(255).required(),
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(user);
};

const validateAuth = (user: LoginRequest) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};

export { validateUser, validateAuth };
