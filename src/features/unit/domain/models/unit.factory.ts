import { UnitModel } from './unit.model';

export interface IUnit {
  id: number;
  name: string;
  code: string;
  createdAt: Date;
  status: boolean;
}
export class UnitFactory {
  create(category: Partial<IUnit>) {
    const id = category.id || 0;
    const name = category.name;
    const status = category.status || true;
    const createdAt = category.createdAt;
    const code = category.code;
    if (!name) {
      throw new Error('unidad name is required');
    }
    if (!code) {
      throw new Error('unidad codigo is required');
    }
    return new UnitModel(id, name, code, status, createdAt);
  }
}
