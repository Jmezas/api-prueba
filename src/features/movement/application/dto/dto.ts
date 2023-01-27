import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { MovementModel } from '../../domain/models/movement.model';

export class MovementDto extends DTOAbstract<MovementModel> {
  callback(result: Result<MovementModel>): Result<MovementModel> {
    const data = result.payload.data;

    if (Array.isArray(data)) {
      result.payload.data = data.map((product: MovementModel) => {
        delete (result.payload.data as MovementModel).status;

        return product;
      });
    } else {
      const MovementModel = result.payload.data as MovementModel;

      delete (result.payload.data as MovementModel).status;
    }
    return result;
  }
}
