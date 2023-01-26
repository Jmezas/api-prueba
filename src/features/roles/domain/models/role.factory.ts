import { RoleModel } from './role.model';

export interface IRole {
  id: number;
  name: string;
  menu: number[];
  status: boolean;
}
export class RoleFactory {
  create(role: Partial<IRole>) {
    const id = role.id || 0;
    const name = role.name;
    const status = role.status || true;
    const menus = role.menu;
    if (!name) {
      throw new Error('Role name is required');
    }
    return new RoleModel(id, name, status);
  }
}
