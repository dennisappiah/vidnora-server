import fs from "fs/promises";
import path from "path";
import brcrypt from "bcrypt";

const deleteFolder = async (folderPath: string) => {
  try {
    const files = await fs.readdir(folderPath);
    await Promise.all(
      files.map((file) => fs.unlink(path.join(folderPath, file)))
    );
    await fs.rmdir(folderPath);
  } catch (err) {}
};

const deleteFile = async (filePath: string) => {
  try {
    await fs.unlink(filePath);
  } catch (e) {}
};

const hashPassword = async (password: string) => {
  const salt = await brcrypt.genSalt(10);

  return await brcrypt.hash(password, salt);
};

export { deleteFolder, deleteFile, hashPassword };
