import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/features/shared/application/interfaces/dtos/response.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { Trace } from 'src/features/shared/helpers/trace.helper';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { In, Like, Repository } from 'typeorm';
import { MenuEntity } from '../domain/models/menu.entity';
import { MenuModel } from '../domain/models/menu.model';
import { MenuRepository } from '../domain/repositories/menu.repository';

@Injectable()
export class MenuInfrastructure
  extends BaseInfrastructure<MenuModel>
  implements MenuRepository
{
  constructor(
    @InjectRepository(MenuEntity)
    private readonly Repository: Repository<MenuEntity>,
  ) {
    super(Repository);
  }
  async findByIds(ids: number[]): Promise<MenuEntity[]> {
    const result = await this.Repository.findBy({ id: In(ids) });

    return result;
  }
  override async getPage(
    page: number,
    pagesize: number,
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<MenuEntity>> {
    const [data, total] = await this.Repository.findAndCount({
      where: [where, { name: Like(`%${(where as any).name}%`) }],
      relations,
      order,
      skip: page * pagesize,
      take: pagesize,
    });

    let a = data;
    let b = data;
    let newArray: any = [];
    a.forEach((item) => {
      b.forEach((item2) => {
        if (item.code_menu == item2.id) {
          newArray.push({
            ...item2,
          });
        }
      });
    });

    data.map((item) => {
      newArray.map((item2) => {
        if (item.code_menu == item2.id) {
          item.code_menu = item2.name;
        }
      });
    });

    return ResponseDto<MenuEntity>(Trace.TraceId(), data, total);
  }

  async findTree(where: object = {}): Promise<Result<MenuEntity>> {
    const data = await this.Repository.find({ where, order: { order: 'ASC' } });

    let dataTree: any[] = [];
    data.map((item) => {
      dataTree.push({
        id: item.id,
        label: item.name,
        code_menu: item.code_menu,
      });
    });

    let a = dataTree;
    let m = new Map();

    //Crear un mapa de todos los elementos con su id como clave
    dataTree.forEach((element) => m.set(element.id, element));

    // Iterar de nuevo sobre los elementos y crear relaciones padre-hijo
    dataTree.forEach((element) => {
      if (element.code_menu && m.has(element.code_menu)) {
        if (!m.get(element.code_menu).children) {
          m.get(element.code_menu).children = [];
        }
        m.get(element.code_menu).children.push(element);
      }
    });
    // Obtener sólo los elementos sin padre
    let result = dataTree.filter((element) => !element.code_menu);

    return ResponseDto<MenuEntity>(Trace.TraceId(), result);
  }

  async findMenuRole(where: object = {}): Promise<Result<MenuEntity>> {
    const MenuRoles = await this.Repository.find({
      where: { roles: { name: (where as any).id } },
      order: { order: 'ASC' },
    });

    return ResponseDto<MenuEntity>(Trace.TraceId(), MenuRoles);
  }
}
