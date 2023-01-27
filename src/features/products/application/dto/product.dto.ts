import { GeneralModel } from 'src/features/general/domain/models/general.model';
import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';

import { ProductModel } from '../../domain/models/product.model';

export class ProductDto extends DTOAbstract<ProductModel> {
  callback(result: Result<ProductModel>): Result<ProductModel> {
    const data = result.payload.data;

    if (Array.isArray(data)) {
      result.payload.data = data.map((product: ProductModel) => {
        if (product.category) {
          product.category = product.category['name'];
          product.unit = product.unit['code'];
          product.operation_type = product.operation_type['description'];
        }

        delete product.createdAt;
        delete (result.payload.data as ProductModel).status;

        return product;
      });
    } else {
      const ProductModel = result.payload.data as ProductModel;
      // if (ProductModel.category) {
      //   ProductModel.category = ProductModel.category['name'];
      //   ProductModel.unit = ProductModel.unit['name'];
      delete (ProductModel.operation_type as GeneralModel).createdAt;
      delete (ProductModel.operation_type as GeneralModel).status;

      // }

      delete (result.payload.data as ProductModel).createdAt;
      delete (result.payload.data as ProductModel).status;
    }
    return result;
  }
}
