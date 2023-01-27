import { UbigeoEntity } from 'src/features/ubigeo/domain/models/ubigeo.entity';

export class CustomerModel {
  constructor(
    public id: number,
    public name: string,
    public nroDocumento: string,
    public email: string,
    public phone: string,
    public address: string,
    public document: string | number,
    public departament: string,
    public province: string,
    public distrit: string,
    public ubigeo: UbigeoEntity,
    public status: boolean,
    public createdAt: Date,
  ) {}
}
