import { MenuEntity } from 'src/features/menu/domain/models/menu.entity';
import { UserEntity } from 'src/features/users/domain/models/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @ManyToMany((type) => UserEntity, (user) => user.roles)
  users: UserEntity[];

  @ManyToMany((type) => MenuEntity, (menu) => menu.roles)
  @JoinTable()
  menus: MenuEntity[] | number[] | string[];
}
