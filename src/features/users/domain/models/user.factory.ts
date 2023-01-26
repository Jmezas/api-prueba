import { PasswordService } from '../services/password.service';
import { TokensService } from '../services/tokens.service';
import { UserModel } from './user.model';

export interface IUser {
  id: number;
  name: string;
  age: number;
  lastname: string;
  email: string;
  password: string;
  roles: number[];
  warehouses: number[];
  refreshToken: string;
  document: string;
  phone: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  status: boolean;
}

export class UserFactory {
  async create(user: Partial<IUser>) {
    const id = user.id || 0;
    const name = user.name;
    const lastname = user.lastname;
    const email = user.email;
    const document = user.document;
    const phone = user.phone;
    const image = user.image;
    const roles = user.roles;
    const warehouses = user.warehouses;
    const password = await PasswordService.hashPassword(user.password);
    const refreshToken = TokensService.generateRefreshToken();
    const createdAt = new Date();
    const updatedAt = new Date();
    const deletedAt = new Date();
    const status = user.status || true;

    if (name.trim() === '' || name.trim().length < 4) {
      throw new Error('Invalid name');
    }

    return new UserModel(
      id,
      name,
      lastname,
      email,
      password,
      refreshToken,
      document,
      phone,
      image,
      roles,
      warehouses,
      createdAt,
      updatedAt,
      deletedAt,
      status,
    );
  }
}
