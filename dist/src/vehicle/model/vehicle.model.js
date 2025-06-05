"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Vehicle_id, _Vehicle_brand, _Vehicle_model, _Vehicle_year, _Vehicle_color, _Vehicle_price, _Vehicle_isAvailable;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const crypto_1 = require("crypto");
class Vehicle {
    constructor({ id = (0, crypto_1.randomUUID)(), brand, model, year, color, price, isAvailable = true, }) {
        _Vehicle_id.set(this, void 0);
        _Vehicle_brand.set(this, void 0);
        _Vehicle_model.set(this, void 0);
        _Vehicle_year.set(this, void 0);
        _Vehicle_color.set(this, void 0);
        _Vehicle_price.set(this, void 0);
        _Vehicle_isAvailable.set(this, void 0);
        __classPrivateFieldSet(this, _Vehicle_id, id, "f");
        __classPrivateFieldSet(this, _Vehicle_brand, brand, "f");
        __classPrivateFieldSet(this, _Vehicle_model, model, "f");
        __classPrivateFieldSet(this, _Vehicle_year, year, "f");
        __classPrivateFieldSet(this, _Vehicle_color, color, "f");
        __classPrivateFieldSet(this, _Vehicle_price, price, "f");
        __classPrivateFieldSet(this, _Vehicle_isAvailable, isAvailable, "f");
    }
    get id() {
        return __classPrivateFieldGet(this, _Vehicle_id, "f");
    }
    get brand() {
        return __classPrivateFieldGet(this, _Vehicle_brand, "f");
    }
    get model() {
        return __classPrivateFieldGet(this, _Vehicle_model, "f");
    }
    get year() {
        return __classPrivateFieldGet(this, _Vehicle_year, "f");
    }
    get color() {
        return __classPrivateFieldGet(this, _Vehicle_color, "f");
    }
    get price() {
        return __classPrivateFieldGet(this, _Vehicle_price, "f");
    }
    get isAvailable() {
        return __classPrivateFieldGet(this, _Vehicle_isAvailable, "f");
    }
    set brand(brand) {
        if (brand) {
            __classPrivateFieldSet(this, _Vehicle_brand, brand, "f");
        }
    }
    set model(model) {
        if (model) {
            __classPrivateFieldSet(this, _Vehicle_model, model, "f");
        }
    }
    set year(year) {
        if (year) {
            __classPrivateFieldSet(this, _Vehicle_year, year, "f");
        }
    }
    set color(color) {
        if (color) {
            __classPrivateFieldSet(this, _Vehicle_color, color, "f");
        }
    }
    set price(price) {
        if (price) {
            __classPrivateFieldSet(this, _Vehicle_price, price, "f");
        }
    }
    set isAvailable(isAvailable) {
        if (isAvailable !== undefined) {
            __classPrivateFieldSet(this, _Vehicle_isAvailable, isAvailable, "f");
        }
    }
}
exports.Vehicle = Vehicle;
_Vehicle_id = new WeakMap(), _Vehicle_brand = new WeakMap(), _Vehicle_model = new WeakMap(), _Vehicle_year = new WeakMap(), _Vehicle_color = new WeakMap(), _Vehicle_price = new WeakMap(), _Vehicle_isAvailable = new WeakMap();
//# sourceMappingURL=vehicle.model.js.map