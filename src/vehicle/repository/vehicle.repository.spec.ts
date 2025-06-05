import { VehicleRepository } from "./vehicle.repository";
import { prismaMock } from "../../__mocks__/prisma";
import { Vehicle } from "../model/vehicle.model";

describe("VehicleRepository", () => {
  let vehicleRepository: VehicleRepository;

  beforeAll(() => {
    vehicleRepository = new VehicleRepository();
  });

  describe("Método save", () => {
    it("deve salvar um veículo", async () => {
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

  describe("Método get", () => {
    it("deve obter um veículo por ID", async () => {
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

    it("deve lançar erro se o veículo não for encontrado", async () => {
      prismaMock.vehicle.findUnique.mockResolvedValue(null);

      await expect(vehicleRepository.get("non-existent-id")).rejects.toThrow(
        "Vehicle not found"
      );
    });
  });
});
