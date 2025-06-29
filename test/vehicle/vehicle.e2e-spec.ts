import axios from "axios";
import request from "supertest";
import express from "express";
import { vehicleController } from "../../src/vehicle/controller";

const app = express();
app.use(express.json());
app.use("/vehicles", vehicleController);
jest.mock("axios");
describe("Vehicle Controller Endpoints", () => {
  let vehicleId: string;
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  mockedAxios.post.mockResolvedValueOnce({ status: 201 });
  mockedAxios.patch.mockResolvedValueOnce({ status: 201 });
  it("should create a new vehicle", async () => {
    const newVehicle = {
      brand: "Toyota",
      model: "Corolla",
      year: 2022,
      color: "Red",
      price: 20000,
      isAvailable: true,
    };

    const response = await request(app)
      .post("/vehicles")
      .send(newVehicle)
      .expect(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body.brand).toBe(newVehicle.brand);
    expect(response.body.model).toBe(newVehicle.model);
    vehicleId = response.body.id;
  });

  it("should update vehicle availability", async () => {
    const updatedData = {
      id: vehicleId,
      isAvailable: false,
    };

    const response = await request(app)
      .patch("/vehicles/availability")
      .send(updatedData)
      .expect(200);

    expect(response.body.isAvailable).toBe(updatedData.isAvailable);
  });

  it("should retrieve a vehicle by ID", async () => {
    const response = await request(app)
      .get(`/vehicles/${vehicleId}`)
      .expect(200);

    expect(response.body.id).toBe(vehicleId);
  });
});
