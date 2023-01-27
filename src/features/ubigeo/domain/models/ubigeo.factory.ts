import { UbigeoModel } from './ubigeo.model';

export interface IUbigeo {
  id: number;
  country: string;
  department: string;
  province: string;
  district: string;
  description: string;
  code: string;
}
export class UbigeoFactory {
  create(obj: Partial<IUbigeo>) {
    const id = obj.id || 0;
    const country = obj.country;
    const department = obj.department;
    const province = obj.province;
    const district = obj.district;
    const description = obj.description;
    const code = obj.code;

    return new UbigeoModel(
      id,
      country,
      department,
      province,
      district,
      description,
      code,
    );
  }
}
