import { Router } from "express";
import {
  getAvailableCars,
  getByAvailableOrRented,
  getByModelOrRented,
  searchCars,
} from "./special.controller";

const specialRouter = Router();

specialRouter.get("/search", searchCars);
specialRouter.get("/getAvailable", getAvailableCars);
specialRouter.get("/modelOrRented", getByModelOrRented);
specialRouter.get("/cars", getByAvailableOrRented);

export { specialRouter };
