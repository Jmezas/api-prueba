export class UbigeoModel {
  constructor(
    public id: number,
    public country: string,
    public department: string,
    public province: string,
    public district: string,
    public description: string,
    public code: string,
  ) {}
}

export class UbigeoListModel {
  constructor(public code: string, public descriptions: string) {}
}
