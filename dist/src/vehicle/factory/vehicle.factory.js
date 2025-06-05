"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleFactory = void 0;
const vehicle_model_1 = require("../model/vehicle.model");
class VehicleFactory {
    create({ id, brand, model, year, color, price, isAvailable, }) {
        return new vehicle_model_1.Vehicle({ id, brand, model, year, color, price, isAvailable });
    }
}
exports.VehicleFactory = VehicleFactory;
//# sourceMappingURL=vehicle.factory.js.map