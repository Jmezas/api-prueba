import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { RoleModel } from '../../domain/models/role.model';

export class RoleDto extends DTOAbstract<RoleModel> {
  callback(result: Result<RoleModel>): Result<RoleModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map((role: RoleModel) => {
        return role;
      });
    } else {
      const userModel = result.payload.data as RoleModel;

      delete (result.payload.data as RoleModel).status;
    }
    return result;
  }
}
