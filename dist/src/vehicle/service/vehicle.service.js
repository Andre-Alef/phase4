"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const axios_1 = __importDefault(require("axios"));
const URL = "http://vehicle:3001";
class VehicleService {
    constructor(vehicleRepository, vehicleFactory) {
        this.vehicleRepository = vehicleRepository;
        this.vehicleFactory = vehicleFactory;
    }
    async create({ brand, model, year, color, price, isAvailable, }) {
        const vehicle = this.vehicleFactory.create({
            brand,
            model,
            year,
            color,
            price,
            isAvailable,
        });
        const created = await this.vehicleRepository.save(vehicle);
        try {
            const response = await axios_1.default.post(`${URL}/vehicles`, {
                id: created.id,
                brand: created.brand,
                model: created.model,
                year: created.year,
                color: created.color,
                price: created.price,
                isAvailable: created.isAvailable,
            });
            console.log("Veículo criado com sucesso:", response.data);
        }
        catch (error) {
            console.error("Erro ao criar veículo:", error);
        }
        return created;
    }
    async update({ id, brand, model, year, color, price, isAvailable, }) {
        const vehicle = await this.get(id);
        vehicle.brand = brand;
        vehicle.model = model;
        vehicle.year = year;
        vehicle.color = color;
        vehicle.price = price;
        vehicle.isAvailable = isAvailable;
        const updatedVehicle = await this.vehicleRepository.save(vehicle);
        try {
            const response = await axios_1.default.patch(`${URL}/vehicles`, {
                id: updatedVehicle.id,
                brand: updatedVehicle.brand,
                model: updatedVehicle.model,
                year: updatedVehicle.year,
                color: updatedVehicle.color,
                price: updatedVehicle.price,
                isAvailable: updatedVehicle.isAvailable,
            });
            console.log("Veículo criado com sucesso:", response.data);
        }
        catch (error) {
            console.error("Erro ao criar veículo:", error);
        }
        return updatedVehicle;
    }
    async get(id) {
        return this.vehicleRepository.get(id);
    }
    async updateAvailability({ id, isAvailable, }) {
        const vehicle = await this.get(id);
        vehicle.isAvailable = isAvailable;
        const updatedVehicle = await this.vehicleRepository.save(vehicle);
        return updatedVehicle;
    }
}
exports.VehicleService = VehicleService;
//# sourceMappingURL=vehicle.service.js.map