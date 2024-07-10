import { Router } from "express";
import { addCar, deleteCar, getCar, getCars, updateCar } from "./car.controller";

const carRouter = Router();

carRouter.get("/", getCars);
carRouter.get("/:id", getCar);
carRouter.post("/", addCar);
carRouter.put("/:id", updateCar);
carRouter.delete("/:id", deleteCar);

export { carRouter };
