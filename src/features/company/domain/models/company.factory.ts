import { CompanyModel } from './company.model';

export interface ICompany {
  id: number;
  ruc: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  web: string;
  image: string;
}

export class CompanyFactory {
  create(company: Partial<ICompany>) {
    const id = company.id || 0;
    const ruc = company.ruc;
    const name = company.name;
    const address = company.address;
    const email = company.email;
    const phone = company.phone;
    const web = company.web;
    const image = company.image;
    if (!ruc) {
      throw new Error('ruc is required');
    }
    if (!name) {
      throw new Error('name is required');
    }
    if (!address) {
      throw new Error('adress is required');
    }
    return new CompanyModel(id, ruc, name, address, email, phone, web, image);
  }
}
