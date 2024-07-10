import { Router } from "express";
import { addRent, deleteRent, getRent, getRents, updateRent } from "./rent.controller";

const rentRouter = Router();

rentRouter.get("/", getRents);
rentRouter.get("/:id", getRent);
rentRouter.post("/", addRent);
rentRouter.put("/:id", updateRent);
rentRouter.delete("/:id", deleteRent);

export { rentRouter };
