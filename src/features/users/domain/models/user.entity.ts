import { IsEmail, IsNotEmpty } from 'class-validator';
import { RoleEntity } from 'src/features/roles/domain/models/role.entity';
import { WarehouseEntity } from 'src/features/warehouse/domain/models/warehouse.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  lastname: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  refreshToken: string;

  @Column({ type: 'varchar', length: 100 })
  document: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp' })
  deletedAt: Date;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @ManyToMany((type) => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];

  @ManyToMany((type) => WarehouseEntity, (Warehouse) => Warehouse.users)
  @JoinTable()
  warehouses: WarehouseEntity[];
}
