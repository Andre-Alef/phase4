import axios from "axios";
import { VehicleService } from "./vehicle.service";
import { VehicleFactory } from "../factory/vehicle.factory";
import { IVehicleRepository } from "../repository/vehicle.repository";
import { Vehicle } from "../model/vehicle.model";

// Mocking axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mocking IVehicleRepository
const mockVehicleRepository: jest.Mocked<IVehicleRepository> = {
  save: jest.fn(),
  get: jest.fn(),
};

describe("VehicleService", () => {
  let vehicleService: VehicleService;
  let vehicleFactory: VehicleFactory;

  beforeEach(() => {
    vehicleFactory = new VehicleFactory();
    vehicleService = new VehicleService(mockVehicleRepository, vehicleFactory);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a vehicle and make an axios POST request", async () => {
      const vehicleData = {
        brand: "Toyota",
        model: "Corolla",
        year: 2022,
        color: "Red",
        price: 20000,
        isAvailable: true,
      };

      const createdVehicle = new Vehicle(vehicleData);
      mockVehicleRepository.save.mockResolvedValue(createdVehicle);
      mockedAxios.post.mockResolvedValue({ data: vehicleData });

      const result = await vehicleService.create(vehicleData);

      expect(result).toBe(createdVehicle);
      expect(mockVehicleRepository.save).toHaveBeenCalledWith(
        expect.any(Vehicle)
      );
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://vehicle:3001/vehicles",
        expect.objectContaining(vehicleData)
      );
    });

    it("should handle error when creating a vehicle", async () => {
      const vehicleData = {
        brand: "Toyota",
        model: "Corolla",
        year: 2022,
        color: "Red",
        price: 20000,
        isAvailable: true,
      };

      const createdVehicle = new Vehicle(vehicleData);
      mockVehicleRepository.save.mockResolvedValue(createdVehicle);
      mockedAxios.post.mockRejectedValue(new Error("Network Error"));

      const result = await vehicleService.create(vehicleData);

      expect(result).toBe(createdVehicle);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://vehicle:3001/vehicles",
        expect.objectContaining(vehicleData)
      );
    });
  });

  describe("update", () => {
    it("should update a vehicle and make an axios PATCH request", async () => {
      const existingVehicle = new Vehicle({
        id: "1",
        brand: "Toyota",
        model: "Corolla",
        year: 2022,
        color: "Red",
        price: 20000,
        isAvailable: true,
      });
      const updatedData = {
        id: "1",
        brand: "Toyota",
        model: "Camry",
        year: 2023,
        color: "Blue",
        price: 25000,
        isAvailable: false,
      };

      mockVehicleRepository.get.mockResolvedValue(existingVehicle);
      mockVehicleRepository.save.mockResolvedValue(new Vehicle(updatedData));
      mockedAxios.patch.mockResolvedValue({ data: updatedData });

      const result = await vehicleService.update(updatedData);

      expect(result).toEqual(expect.objectContaining(updatedData));
      expect(mockVehicleRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(updatedData)
      );
      expect(mockedAxios.patch).toHaveBeenCalledWith(
        "http://vehicle:3001/vehicles",
        expect.objectContaining(updatedData)
      );
    });

    it("should update vehicle availability", async () => {
      const existingVehicle = new Vehicle({
        id: "1",
        brand: "Toyota",
        model: "Corolla",
        year: 2022,
        color: "Red",
        price: 20000,
        isAvailable: true,
      });
      const updatedData = { id: "1", isAvailable: false };

      mockVehicleRepository.get.mockResolvedValue(existingVehicle);
      mockVehicleRepository.save.mockResolvedValue(existingVehicle);

      const result = await vehicleService.updateAvailability(updatedData);

      expect(result.isAvailable).toBe(false);
      expect(mockVehicleRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(updatedData)
      );
    });
  });
});
