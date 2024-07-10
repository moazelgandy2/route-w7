import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { db } from "../../db/db";
import { ObjectId } from "mongodb";

const users = db.collection("users");

const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await users.find().toArray();
    res.json({ users: allUsers });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await users.findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(404).json({ message: "User Not Found" });
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(email, password);
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    console.log(user);
    const userWithoutPassword = { ...user, password: undefined };
    delete userWithoutPassword.password;
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return res.json({ message: "User LoggedIn Successfully", userWithoutPassword });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addUser = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  const userStructure = {
    name: "string .. required",
    email: "string .. required",
    password: "string .. required",
    phone: "string .. required",
  };

  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      message: `The input should be on the following structure:`,
      userStructure,
    });
  }

  if (phone.length !== 11) {
    return res.status(400).json({ message: `Phone number: ${phone} is not valid!` });
  }
  const existUser = await users.findOne({ email: email });

  if (existUser) {
    return res.status(400).json({ message: "User with this email already exist" });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const { insertedId } = await users.insertOne({ name, email, password: hashedPassword, phone });
    const user = await users.findOne({ _id: new ObjectId(insertedId) });
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, phone, oldPassword, newPassword } = req.body;
  if (!name || !phone || !oldPassword || !newPassword) {
    const fields = [`name`, `phone`, `oldPassword`, `newPassword`];
    return res.status(400).json({ message: "All fields are required", fields });
  }
  try {
    const user = await users.findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const valid = bcrypt.compareSync(oldPassword, user.password);
    if (!valid) return res.status(400).json({ message: "Password is incorrect" });
    const hashedPass = bcrypt.hashSync(newPassword, 8);
    await users.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, phone, password: hashedPass } }
    );
    const updatedUser = await users.findOne({ _id: new ObjectId(id) });

    res.json({ message: "User Updated", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const user = await users.findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(400).json({ message: "Password is incorrect" });
    await users.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "User Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getUsers, addUser, getUser, signIn, updateUser, deleteUser };
