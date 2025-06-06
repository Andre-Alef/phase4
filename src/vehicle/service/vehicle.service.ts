import axios from "axios";
import { VehicleFactory } from "../factory/vehicle.factory";
import { Vehicle } from "../model/vehicle.model";
import { IVehicleRepository } from "../repository/vehicle.repository";

interface ICreateVehicle {
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
  isAvailable: boolean;
}

interface IUpdateVehicle {
  id: string;
  brand?: string;
  model?: string;
  year?: number;
  color?: string;
  price?: number;
  isAvailable?: boolean;
}
const URL = process.env.VEHICLE_API_URL;
export class VehicleService {
  constructor(
    readonly vehicleRepository: IVehicleRepository,
    readonly vehicleFactory: VehicleFactory
  ) {}
  async create({
    brand,
    model,
    year,
    color,
    price,
    isAvailable,
  }: ICreateVehicle): Promise<Vehicle> {
    const vehicle: Vehicle = this.vehicleFactory.create({
      brand,
      model,
      year,
      color,
      price,
      isAvailable,
    });

    const created = await this.vehicleRepository.save(vehicle);

    try {
      console.log({ URL });
      const response = await axios.post<ICreateVehicle>(`${URL}/vehicles`, {
        id: created.id,
        brand: created.brand,
        model: created.model,
        year: created.year,
        color: created.color,
        price: created.price,
        isAvailable: created.isAvailable,
      });
      console.log("Veículo criado com sucesso:", response.data);
    } catch (error) {
      await this.vehicleRepository.delete(created.id);
      console.error("Erro ao criar veículo:", error);
      throw new Error("Erro ao criar veículo:");
    }
    return created;
  }

  async update({
    id,
    brand,
    model,
    year,
    color,
    price,
    isAvailable,
  }: IUpdateVehicle): Promise<Vehicle> {
    const vehicleOld: Vehicle = await this.get(id);

    const vehicleToUpdate = this.vehicleFactory.create({
      id: vehicleOld.id,
      brand: vehicleOld.brand,
      model: vehicleOld.model,
      year: vehicleOld.year,
      color: vehicleOld.color,
      price: vehicleOld.price,
      isAvailable: vehicleOld.isAvailable,
    });
    vehicleToUpdate.brand = brand;
    vehicleToUpdate.model = model;
    vehicleToUpdate.year = year;
    vehicleToUpdate.color = color;
    vehicleToUpdate.price = price;
    vehicleToUpdate.isAvailable = isAvailable;

    const updatedVehicle = await this.vehicleRepository.save(vehicleToUpdate);
    try {
      const response = await axios.patch<IUpdateVehicle>(`${URL}/vehicles`, {
        id: updatedVehicle.id,
        brand: updatedVehicle.brand,
        model: updatedVehicle.model,
        year: updatedVehicle.year,
        color: updatedVehicle.color,
        price: updatedVehicle.price,
        isAvailable: updatedVehicle.isAvailable,
      });
      console.log("Veículo criado com sucesso:", response.data);
    } catch (error) {
      await this.vehicleRepository.save(vehicleOld);
      console.error("Erro ao atualizar veículo:", error);
      throw new Error("Erro ao atualizar veículo");
    }
    return updatedVehicle;
  }

  async get(id: string): Promise<Vehicle> {
    return this.vehicleRepository.get(id);
  }

  async updateAvailability({
    id,
    isAvailable,
  }: IUpdateVehicle): Promise<Vehicle> {
    const vehicle: Vehicle = await this.get(id);

    vehicle.isAvailable = isAvailable;

    const updatedVehicle = await this.vehicleRepository.save(vehicle);
    return updatedVehicle;
  }
}
