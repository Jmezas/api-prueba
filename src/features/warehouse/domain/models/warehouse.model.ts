import { CompanyModel } from 'src/features/company/domain/models/company.model';
import { MovementModel } from 'src/features/movement/domain/models/movement.model';
import { UbigeoModel } from 'src/features/ubigeo/domain/models/ubigeo.model';
import { UserModel } from 'src/features/users/domain/models/user.model';

export class WarehouseModel {
  constructor(
    public id: number,
    public name: string,
    public phone: string,
    public address: string,
    public email: string,
    public departament: string,
    public province: string,
    public distrit: string,
    public ubigeo: number | UbigeoModel,
    public company: number | CompanyModel,
    public users: number[] | UserModel[],
    public movement: number | MovementModel,
    public status: boolean,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}
