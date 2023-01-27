import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { CustomerModel } from 'src/features/customers/domain/models/customer.model';

const FilterFieldActiveInCustomer = (Customer: CustomerModel) => {
  const obj = Object.assign({}, Customer);
  delete obj.status;
  return obj;
};

export class CustomerDto extends DTOAbstract<CustomerModel> {
  callback(result: Result<CustomerModel>): Result<CustomerModel> {
    const data = result.payload.data;

    if (!data) return result;
    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInCustomer);
    } else {
      delete (result.payload.data as CustomerModel).status;
    }

    return result; //not info
  }
}
