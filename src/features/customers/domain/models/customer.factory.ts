import { GeneralEntity } from 'src/features/general/domain/models/general.entity';
import { UbigeoEntity } from 'src/features/ubigeo/domain/models/ubigeo.entity';
import { CustomerModel } from './customer.model';

export interface ICustomer {
  id: number;
  name: string;
  nroDocumento: string;
  email: string;
  phone: string;
  address: string;
  document: number | string;
  departament: string;
  province: string;
  distrit: string;
  ubigeo: UbigeoEntity;
  status: boolean;
  createdAt: Date;
}
export class CustomerFactory {
  create(customer: Partial<ICustomer>) {
    const id = customer.id || 0;
    const nroDocumento = customer.nroDocumento;
    const name = customer.name;
    const email = customer.email;
    const phone = customer.phone;
    const address = customer.address;
    const document = customer.document;
    const departament = customer.departament;
    const province = customer.province;
    const distrit = customer.distrit;
    const ubigeo = customer.ubigeo;
    const status = customer.status || true;
    const createdAt = customer.createdAt;
    return new CustomerModel(
      id,
      name,
      nroDocumento,
      email,
      phone,
      address,
      document,
      departament,
      province,
      distrit,
      ubigeo,
      status,
      createdAt,
    );
  }
}
