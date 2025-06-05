"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vehicle_repository_1 = require("./vehicle.repository");
const prisma_1 = require("../../__mocks__/prisma");
const vehicle_model_1 = require("../model/vehicle.model");
describe("VehicleRepository", () => {
    let vehicleRepository;
    beforeAll(() => {
        vehicleRepository = new vehicle_repository_1.VehicleRepository();
    });
    describe("Método save", () => {
        it("deve salvar um veículo", async () => {
            const vehicleData = new vehicle_model_1.Vehicle({
                id: "1",
                brand: "Toyota",
                model: "Corolla",
                year: 2022,
                color: "Red",
                price: 20000,
                isAvailable: true,
            });
            prisma_1.prismaMock.vehicle.upsert.mockResolvedValue(vehicleData);
            const savedVehicle = await vehicleRepository.save(vehicleData);
            expect(savedVehicle).toEqual(vehicleData);
            expect(prisma_1.prismaMock.vehicle.upsert).toHaveBeenCalledWith(expect.objectContaining({
                where: { id: vehicleData.id },
                create: expect.objectContaining(vehicleData),
                update: expect.objectContaining(vehicleData),
            }));
        });
    });
    describe("Método get", () => {
        it("deve obter um veículo por ID", async () => {
            const vehicle = new vehicle_model_1.Vehicle({
                id: "1",
                brand: "Toyota",
                model: "Corolla",
                year: 2022,
                color: "Red",
                price: 20000,
                isAvailable: true,
            });
            prisma_1.prismaMock.vehicle.findUnique.mockResolvedValue(vehicle);
            const foundVehicle = await vehicleRepository.get("1");
            expect(foundVehicle).toEqual(vehicle);
            expect(prisma_1.prismaMock.vehicle.findUnique).toHaveBeenCalledWith(expect.objectContaining({
                where: { id: "1" },
            }));
        });
        it("deve lançar erro se o veículo não for encontrado", async () => {
            prisma_1.prismaMock.vehicle.findUnique.mockResolvedValue(null);
            await expect(vehicleRepository.get("non-existent-id")).rejects.toThrow("Vehicle not found");
        });
    });
});
//# sourceMappingURL=vehicle.repository.spec.js.map