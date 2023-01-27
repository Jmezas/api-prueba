import { DocumentTypeModel } from './document-type.model';

export interface IDocumentType {
  id: number;
  name: string;
  code: string;
  serie: string;
  number: number;
  createdAt: Date;
  status: boolean;
}
export class DocumentTypeFactory {
  create(obj: Partial<IDocumentType>) {
    const id = obj.id || 0;
    const name = obj.name;
    const code = obj.code;
    const serie = obj.serie;
    const number = obj.number;
    const status = obj.status || true;
    const createdAt = obj.createdAt;
    if (!name) {
      throw new Error('category name is required');
    }
    return new DocumentTypeModel(
      id,
      code,
      name,
      serie,
      number,
      status,
      createdAt,
    );
  }
}
