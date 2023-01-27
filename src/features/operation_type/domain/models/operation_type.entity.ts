import { MovementEntity } from 'src/features/movement/domain/models/movement.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'operation_type' })
export class OperationTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;
  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(() => MovementEntity, (movement) => movement.operationType, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: false,
  })
  movement: MovementEntity[];
}
