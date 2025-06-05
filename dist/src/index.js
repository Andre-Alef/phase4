"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const controller_1 = require("./vehicle/controller");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/vehicles", controller_1.vehicleController);
app.listen(3000, () => {
    console.log("Servidor rodando");
});
//# sourceMappingURL=index.js.map