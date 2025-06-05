"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const vehicle_service_1 = require("./vehicle.service");
const vehicle_factory_1 = require("../factory/vehicle.factory");
const vehicle_model_1 = require("../model/vehicle.model");
// Mocking axios
jest.mock("axios");
const mockedAxios = axios_1.default;
// Mocking IVehicleRepository
const mockVehicleRepository = {
    save: jest.fn(),
    get: jest.fn(),
};
describe("VehicleService", () => {
    let vehicleService;
    let vehicleFactory;
    beforeEach(() => {
        vehicleFactory = new vehicle_factory_1.VehicleFactory();
        vehicleService = new vehicle_service_1.VehicleService(mockVehicleRepository, vehicleFactory);
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
            const createdVehicle = new vehicle_model_1.Vehicle(vehicleData);
            mockVehicleRepository.save.mockResolvedValue(createdVehicle);
            mockedAxios.post.mockResolvedValue({ data: vehicleData });
            const result = await vehicleService.create(vehicleData);
            expect(result).toBe(createdVehicle);
            expect(mockVehicleRepository.save).toHaveBeenCalledWith(expect.any(vehicle_model_1.Vehicle));
            expect(mockedAxios.post).toHaveBeenCalledWith("http://vehicle:3001/vehicles", expect.objectContaining(vehicleData));
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
            const createdVehicle = new vehicle_model_1.Vehicle(vehicleData);
            mockVehicleRepository.save.mockResolvedValue(createdVehicle);
            mockedAxios.post.mockRejectedValue(new Error("Network Error"));
            const result = await vehicleService.create(vehicleData);
            expect(result).toBe(createdVehicle);
            expect(mockedAxios.post).toHaveBeenCalledWith("http://vehicle:3001/vehicles", expect.objectContaining(vehicleData));
        });
    });
    describe("update", () => {
        it("should update a vehicle and make an axios PATCH request", async () => {
            const existingVehicle = new vehicle_model_1.Vehicle({
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
            mockVehicleRepository.save.mockResolvedValue(new vehicle_model_1.Vehicle(updatedData));
            mockedAxios.patch.mockResolvedValue({ data: updatedData });
            const result = await vehicleService.update(updatedData);
            expect(result).toEqual(expect.objectContaining(updatedData));
            expect(mockVehicleRepository.save).toHaveBeenCalledWith(expect.objectContaining(updatedData));
            expect(mockedAxios.patch).toHaveBeenCalledWith("http://vehicle:3001/vehicles", expect.objectContaining(updatedData));
        });
        it("should update vehicle availability", async () => {
            const existingVehicle = new vehicle_model_1.Vehicle({
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
            expect(mockVehicleRepository.save).toHaveBeenCalledWith(expect.objectContaining(updatedData));
        });
    });
});
//# sourceMappingURL=vehicle.service.spec.js.map