import { UserModel } from '../../domain/models/user.model';
import Result from '../../../shared/application/interfaces/result.interface';
import { DTOAbstract } from '../../../shared/application/interfaces/dtos/abstract.dto';
import { PasswordService } from '../../domain/services/password.service';

export class UserDTO extends DTOAbstract<UserModel> {
  callback(result: Result<UserModel>): Result<UserModel> {
    const data = result.payload.data;

    if (Array.isArray(data)) {
      result.payload.data = data.map((user: UserModel) => {
        if (user.roles) {
          user.roles = user.roles.map((role: any) => role.name);
        }

        delete user.password;
        delete user.status;
        delete user.refreshToken;
        delete user.createdAt;
        delete user.updatedAt;
        delete user.deletedAt;

        return user;
      });
    } else {
      const userModel = result.payload.data as UserModel;
      // if (userModel.roles) {
      //   userModel.roles = userModel.roles.map((role: any) => role.id);
      // }
      userModel.password = PasswordService.hashPassword(
        (result.payload.data as UserModel).password,
      );

      delete (result.payload.data as UserModel).status;
      delete (result.payload.data as UserModel).refreshToken;
      delete (result.payload.data as UserModel).createdAt;
      delete (result.payload.data as UserModel).updatedAt;
      delete (result.payload.data as UserModel).deletedAt;
    }
    return result;
  }
}
