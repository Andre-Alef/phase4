"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleRepository = void 0;
const vehicle_model_1 = require("../model/vehicle.model");
const client_1 = require("@prisma/client");
class VehicleRepository {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    } //TODO: make it global
    async save({ id, brand, model, year, color, price, isAvailable, }) {
        const createdVehicle = await this.prisma.vehicle.upsert({
            where: { id },
            create: {
                id,
                brand,
                model,
                year,
                color,
                price,
                isAvailable,
            },
            update: {
                brand,
                model,
                year,
                color,
                price,
                isAvailable,
            },
        });
        return new vehicle_model_1.Vehicle({
            id: createdVehicle.id,
            brand: createdVehicle.brand,
            model: createdVehicle.model,
            year: createdVehicle.year,
            color: createdVehicle.color,
            price: createdVehicle.price,
            isAvailable: createdVehicle.isAvailable,
        });
    }
    async get(id) {
        const vehicle = await this.prisma.vehicle.findUnique({
            where: { id },
        });
        if (!vehicle)
            throw new Error("Vehicle not found");
        return new vehicle_model_1.Vehicle({
            id: vehicle.id,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            color: vehicle.color,
            price: vehicle.price,
            isAvailable: vehicle.isAvailable,
        });
    }
}
exports.VehicleRepository = VehicleRepository;
//# sourceMappingURL=vehicle.repository.js.map