import { Request, Response } from "express";

import { db } from "../../db/db";
import { ObjectId } from "mongodb";

const rents = db.collection("rents");

const getRents = async (req: Request, res: Response) => {
  try {
    const allRents = await rents.find().toArray();
    res.json({ rents: allRents });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addRent = async (req: Request, res: Response) => {
  const { carId, userId, startDate, returnDate } = req.body;

  if (!carId || !userId || !startDate || !returnDate) {
    const fields = ["carId", "userId", "startDate", "returnDate"];
    return res.status(400).json({ message: "All fields are required", fields });
  }

  try {
    const car = await db.collection("cars").findOne({ _id: new ObjectId(carId) });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    if (car.rented) {
      return res.status(400).json({ message: "Car is already rented" });
    }
    const rent = await rents.insertOne({
      carId: new ObjectId(carId),
      userId: new ObjectId(userId),
      startDate,
      returnDate,
    });
    await db.collection("cars").updateOne({ _id: new ObjectId(carId) }, { $set: { rented: true } });

    res.json({ message: "Rent added successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateRent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { startDate, returnDate } = req.body;
  try {
    const rent = await rents.findOne({ _id: new ObjectId(id) });
    if (!rent) {
      return res.status(404).json({ message: "Rent not found" });
    }
    await rents.updateOne({ _id: new ObjectId(id) }, { $set: { startDate, returnDate } });
    const updatedRent = await rents
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: "cars",
            localField: "carId",
            foreignField: "_id",
            as: "car",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            _id: 1,
            startDate: 1,
            returnDate: 1,
            car: { _id: 1, carName: 1, carModel: 1 },
            user: { _id: 1, name: 1, email: 1 },
          },
        },
      ])
      .toArray();
    res.json({ message: "Rent updated successfully", updatedRent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteRent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rent = await rents.findOne({ _id: new ObjectId(id) });
    if (!rent) {
      return res.status(404).json({ message: "Rent not found" });
    }
    await rents.deleteOne({ _id: new ObjectId(id) });
    await db.collection("cars").updateOne({ _id: rent.carId }, { $set: { rented: false } });
    res.json({ message: "Rent deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rent = await rents
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: "cars",
            localField: "carId",
            foreignField: "_id",
            as: "car",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            _id: 1,
            startDate: 1,
            returnDate: 1,
            car: { _id: 1, carName: 1, carModel: 1 },
            user: { _id: 1, name: 1, email: 1 },
          },
        },
      ])
      .toArray();
    if (!rent.length) {
      return res.status(404).json({ message: "Rent not found" });
    }
    res.json({ rentDetails: rent[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getRents, getRent, addRent, updateRent, deleteRent };
