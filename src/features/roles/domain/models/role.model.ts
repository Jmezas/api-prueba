import { MenuEntity } from 'src/features/menu/domain/models/menu.entity';

export class RoleModel {
  constructor(
    public id: number,
    public name: string,
    public menus: MenuEntity[] | number[] | string[],
    public status: boolean,
  ) {}
}
