export class CategoryModel {
  constructor(
    public id: number,
    public name: string,
    public status: boolean,
    public createdAt: Date,
  ) {}
}
