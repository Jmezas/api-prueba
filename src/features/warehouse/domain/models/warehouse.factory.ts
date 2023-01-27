import { WarehouseModel } from './warehouse.model';

export interface IWarehouse {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  departament: string;
  province: string;
  distrit: string;
  ubigeo: number;
  users: number[];
  company: number;
  movement: number;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}
export class WarehouseFactory {
  create(obj: Partial<IWarehouse>) {
    const id = obj.id || 0;
    const name = obj.name;
    const phone = obj.phone;
    const address = obj.address;
    const email = obj.email;
    const departament = obj.departament;
    const province = obj.province;
    const distrit = obj.distrit;
    const ubigeo = obj.ubigeo;
    const company = obj.company;
    const movement = obj.movement;
    const status = obj.status;
    const created_at = obj.created_at;
    const updated_at = obj.updated_at;
    const users = obj.users;
    return new WarehouseModel(
      id,
      name,
      phone,
      address,
      email,
      departament,
      province,
      distrit,
      ubigeo,
      company,
      users,
      movement,
      status,
      created_at,
      updated_at,
    );
  }
}
