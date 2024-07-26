import fs from "fs/promises";
import path from "path";
import brcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

// deleting folder
const deleteFolder = async (folderPath: string) => {
  try {
    const files = await fs.readdir(folderPath);
    await Promise.all(
      files.map((file) => fs.unlink(path.join(folderPath, file)))
    );
    await fs.rmdir(folderPath);
  } catch (err) {}
};

// deleting file
const deleteFile = async (filePath: string) => {
  try {
    await fs.unlink(filePath);
  } catch (e) {}
};

// hashing password
const hashPassword = async (password: string) => {
  const salt = await brcrypt.genSalt(10);

  return await brcrypt.hash(password, salt);
};

// verifying password
const verifyPassword = async (
  requestpassword: string,
  existingUserPassword: string
) => {
  return await brcrypt.compare(requestpassword, existingUserPassword);
};

// generating auth token for user
const generateToken = (user: any) => {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  // Options for the token
  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

export {
  deleteFolder,
  deleteFile,
  hashPassword,
  verifyPassword,
  generateToken,
};
