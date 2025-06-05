import express from "express";
import { config } from "dotenv";
import { vehicleController } from "./vehicle/controller";

config();

const app = express();
app.use(express.json());
app.use("/vehicles", vehicleController);

app.listen(3000, () => {
  console.log("Servidor rodando");
});
