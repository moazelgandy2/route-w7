import { Request, Response } from "express";

import { db } from "../../db/db";
import { ObjectId } from "mongodb";

const rents = db.collection("rents");
const users = db.collection("users");
const cars = db.collection("cars");

const searchCars = async (req: Request, res: Response) => {
  const params = req.query;
  const { model } = params;

  if (!model) {
    res.status(400).json({ message: "Car model is required" });
    return;
  }

  try {
    const result = await cars.find({ carModel: { $regex: model, $options: "i" } }).toArray();
    if (result.length === 0) {
      res.status(404).json({ message: "No cars found" });
      return;
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAvailableCars = async (req: Request, res: Response) => {
  const params = req.query;
  const { model } = params;
  if (!model) {
    res.status(400).json({ message: "Car model is required" });
    return;
  }

  try {
    const result = await cars
      .find({ carModel: { $regex: model, $options: "i" }, rented: false })
      .toArray();
    if (result.length === 0) {
      res.status(404).json({ message: "No cars found" });
      return;
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getByModelOrRented = async (req: Request, res: Response) => {
  const params = req.query;
  const { model, rented } = params;
  const isRented = rented === "true" ? true : false;

  if (!model) {
    res.status(400).json({ message: "Car model is required" });
    return;
  }

  try {
    console.log(model, isRented);
    const result = await cars
      .find({ carModel: { $regex: model, $options: "i" }, rented: isRented })
      .toArray();
    if (result.length === 0) {
      res.status(404).json({ message: "No cars found" });
      return;
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getByAvailableOrRented = async (req: Request, res: Response) => {
  const params = req.query;
  const { model, rented } = params;

  // Determine the filter conditions based on query parameters
  let filter: any = {};

  if (model) {
    filter.carModel = { $regex: model, $options: "i" };
  }

  if (rented !== undefined) {
    filter.rented = rented === "true"; // Convert string to boolean
  }

  try {
    const result = await cars.find(filter).toArray();

    if (result.length === 0) {
      res.status(404).json({ message: "No cars found" });
      return;
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { searchCars, getAvailableCars, getByModelOrRented, getByAvailableOrRented };
