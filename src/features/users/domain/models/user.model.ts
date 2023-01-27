import { RoleEntity } from 'src/features/roles/domain/models/role.entity';
import { WarehouseEntity } from 'src/features/warehouse/domain/models/warehouse.entity';

export class UserModel {
  constructor(
    public id: number,
    public name: string,
    public lastname: string,
    public email: string,
    public password: string,
    public refreshToken: string,
    public document: string,
    public phone: string,
    public image: string,
    public roles: number[] | string[] | RoleEntity[],
    public warehouses: number[] | string[] | WarehouseEntity[],
    public createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
    public status: boolean,
  ) {}
}
