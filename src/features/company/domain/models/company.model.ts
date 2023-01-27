export class CompanyModel {
  constructor(
    public id: number,
    public ruc: string,
    public name: string,
    public address: string,
    public email: string,
    public phone: string,
    public web: string,
    public image: string,
  ) {}
}
