import { Request, Response } from "express";
import { db } from "../../db/db";
import { ObjectId } from "mongodb";

const cars = db.collection("cars");

const getCars = async (req: Request, res: Response) => {
  try {
    const allCars = await cars.find().toArray();
    res.json({ cars: allCars });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addCar = async (req: Request, res: Response) => {
  const { carName, carModel, rented } = req.body;

  try {
    const result = await cars.insertOne({ carName, carModel, rented });
    const car = await cars.findOne({ _id: result.insertedId });
    res.json({ car });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCar = async (req: Request, res: Response) => {
  const { carName, carModel, rented } = req.body;
  const { id } = req.params;

  if (!carName || !carModel || !rented) {
    const fields = ["carName", "carModel", "rented"];
    return res.status(400).json({ message: "All fields are required", fields });
  }

  try {
    const car = await cars.findOne({ _id: new ObjectId(id) });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    await cars.updateOne({ _id: new ObjectId(id) }, { $set: { carName, carModel, rented } });
    const updatedCar = await cars.findOne({ _id: new ObjectId(id) });
    res.json({ message: "Car updated successfully", updatedCar });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const car = await cars.findOne({ _id: new ObjectId(id) });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    await cars.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Car deleted successfully", car });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCar = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const car = await cars.findOne({ _id: new ObjectId(id) });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ car });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addCar, getCars, updateCar, deleteCar, getCar };
