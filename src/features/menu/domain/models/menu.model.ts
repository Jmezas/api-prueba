export class MenuModel {
  constructor(
    public id: number,
    public code_menu: number | string,
    public name: string,
    public path: string,
    public order: number,
    public icon: string,
    public type: string,
    public status: boolean,
  ) {}
}
