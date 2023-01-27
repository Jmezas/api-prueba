import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { SaleModel } from '../../domain/models/sale.model';

export class SaleDto extends DTOAbstract<SaleModel> {
  callback(result: Result<SaleModel>): Result<SaleModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map((sales: SaleModel) => {
        if (sales.details) {
          sales.details = sales.details.map((detail: any) => detail.name);
        }
        delete sales.status;
        delete sales.createdAt;
        return sales;
      });
    } else {
      delete (result.payload.data as SaleModel).status;
    }
    return result;
  }
}
