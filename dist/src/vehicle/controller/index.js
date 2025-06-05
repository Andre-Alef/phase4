"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const express_1 = require("express");
const vehicle_factory_1 = require("../factory/vehicle.factory");
const vehicle_repository_1 = require("../repository/vehicle.repository");
const vehicle_service_1 = require("../service/vehicle.service");
const vehicleRepository = new vehicle_repository_1.VehicleRepository();
const vehicleFactory = new vehicle_factory_1.VehicleFactory();
const vehicleService = new vehicle_service_1.VehicleService(vehicleRepository, vehicleFactory);
const vehicleController = (0, express_1.Router)();
exports.vehicleController = vehicleController;
vehicleController.post("/", async (req, res) => {
    console.log({ ...req.body });
    const vehicle = await vehicleService.create({ ...req.body });
    console.log({ vehicle });
    res.send(JSON.stringify({
        id: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        color: vehicle.color,
        price: vehicle.price,
        isAvailable: vehicle.isAvailable,
    }, null, 2));
});
vehicleController.patch("/", async (req, res) => {
    const vehicle = await vehicleService.update({ ...req.body });
    res.send(JSON.stringify({
        id: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        color: vehicle.color,
        price: vehicle.price,
        isAvailable: vehicle.isAvailable,
    }, null, 2));
    //res.send(JSON.stringify(req.oidc.user, null, 2));
});
vehicleController.patch("/availability", async (req, res) => {
    const vehicle = await vehicleService.update({ ...req.body });
    res.send(JSON.stringify({
        id: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        color: vehicle.color,
        price: vehicle.price,
        isAvailable: vehicle.isAvailable,
    }, null, 2));
    //res.send(JSON.stringify(req.oidc.user, null, 2));
});
vehicleController.get("/:id", async (req, res) => {
    const vehicle = await vehicleService.get(req.params.id);
    res.send(JSON.stringify({
        id: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        color: vehicle.color,
        price: vehicle.price,
        isAvailable: vehicle.isAvailable,
    }, null, 2));
});
//# sourceMappingURL=index.js.map