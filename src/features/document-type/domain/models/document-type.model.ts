export class DocumentTypeModel {
  constructor(
    public id: number,
    public code: string,
    public name: string,
    public serie: string,
    public number: number,
    public status: boolean,
    public createdAt: Date,
  ) {}
}
