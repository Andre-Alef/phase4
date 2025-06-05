"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../src/vehicle/controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/vehicles", controller_1.vehicleController);
describe("Vehicle Controller Endpoints", () => {
    let vehicleId;
    it("should create a new vehicle", async () => {
        const newVehicle = {
            brand: "Toyota",
            model: "Corolla",
            year: 2022,
            color: "Red",
            price: 20000,
            isAvailable: true,
        };
        const response = await (0, supertest_1.default)(app)
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
        const response = await (0, supertest_1.default)(app)
            .patch("/vehicles/availability")
            .send(updatedData)
            .expect(200);
        expect(response.body.isAvailable).toBe(updatedData.isAvailable);
    });
    it("should retrieve a vehicle by ID", async () => {
        const response = await (0, supertest_1.default)(app)
            .get(`/vehicles/${vehicleId}`)
            .expect(200);
        expect(response.body.id).toBe(vehicleId);
    });
});
//# sourceMappingURL=vehicle.e2e-spec.js.map