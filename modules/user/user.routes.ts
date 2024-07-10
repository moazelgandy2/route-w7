import { Router } from "express";
import { addUser, deleteUser, getUser, getUsers, signIn, updateUser } from "./user.controller";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/", addUser);
userRouter.post("/login", signIn);

export { userRouter };
