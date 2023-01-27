export class GeneralModel {
  constructor(
    public id: number,
    public parentcode: number,
    public code: number,
    public description: string,
    public description2: string,
    public status: boolean,
    public createdAt: Date,
  ) {}
}
