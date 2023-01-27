import { DTOAbstract } from 'src/features/shared/application/interfaces/dtos/abstract.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { DocumentTypeModel } from '../../domain/models/document-type.model';

const FilterFieldActiveInDocument = (category: DocumentTypeModel) => {
  const obj = Object.assign({}, category);
  delete obj.status;
  return obj;
};

export class DocumentTypeDto extends DTOAbstract<DocumentTypeModel> {
  callback(result: Result<DocumentTypeModel>): Result<DocumentTypeModel> {
    const data = result.payload.data;
    if (Array.isArray(data)) {
      result.payload.data = data.map(FilterFieldActiveInDocument);
    } else {
      delete (result.payload.data as DocumentTypeModel).status;
    }
    return result;
  }
}
