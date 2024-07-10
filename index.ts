import express from "express";
import { db } from "./db/db";
import { carRouter } from "./modules/car/car.routes";
import { userRouter } from "./modules/user/user.routes";
import { rentRouter } from "./modules/rent/rent.routes";
import { specialRouter } from "./modules/special/special.routes";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/rents", rentRouter);
app.use("/special", specialRouter);

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
