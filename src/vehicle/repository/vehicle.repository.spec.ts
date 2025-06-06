import { VehicleRepository } from "./vehicle.repository";
import { prismaMock } from "../../__mocks__/prisma";
import { Vehicle } from "../model/vehicle.model";

describe("VehicleRepository", () => {
  let vehicleRepository: VehicleRepository;

  beforeAll(() => {
    vehicleRepository = new VehicleRepository();
  });

  describe("Save", () => {
    it("Should save a vehicle", async () => {
      const vehicleData = new Vehicle({
        id: "1",
        brand: "Toyota",
        model: "Corolla",
        year: 2022,
        color: "Red",
        price: 20000,
        isAvailable: true,
      });

      prismaMock.vehicle.upsert.mockResolvedValue(vehicleData);

      const savedVehicle = await vehicleRepository.save(vehicleData);

      expect(savedVehicle).toEqual(vehicleData);
      expect(prismaMock.vehicle.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: vehicleData.id },
          create: expect.objectContaining(vehicleData),
          update: expect.objectContaining(vehicleData),
        })
      );
    });
  });

  describe("get", () => {
    it("Should get a vehicle by id", async () => {
      const vehicle = new Vehicle({
        id: "1",
        brand: "Toyota",
        model: "Corolla",
        year: 2022,
        color: "Red",
        price: 20000,
        isAvailable: true,
      });

      prismaMock.vehicle.findUnique.mockResolvedValue(vehicle);

      const foundVehicle = await vehicleRepository.get("1");

      expect(foundVehicle).toEqual(vehicle);
      expect(prismaMock.vehicle.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "1" },
        })
      );
    });

    it("Should throw error if vehicle is not found", async () => {
      prismaMock.vehicle.findUnique.mockResolvedValue(null);

      await expect(vehicleRepository.get("non-existent-id")).rejects.toThrow(
        "Vehicle not found"
      );
    });
  });
});
