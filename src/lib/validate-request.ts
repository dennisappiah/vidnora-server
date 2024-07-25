import Joi from "joi";
import User from "../models/user";

const validateUser = (user: typeof User) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    // joi-password complexity for complex passwords
    password: Joi.string().min(5).max(255).required(),
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(user);
};

export { validateUser };
