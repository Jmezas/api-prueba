import { Injectable, Inject } from '@nestjs/common';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { MenuModel } from '../domain/models/menu.model';
import { MenuRepository } from '../domain/repositories/menu.repository';
import { MenuDto } from './dto/dto';

@Injectable()
export class MenuApplication extends BaseApplication<MenuModel> {
  constructor(
    @Inject(BaseRepository)
    private MenuRepository: MenuRepository,
  ) {
    super(MenuRepository, new MenuDto());
  }
  async findTree(where: object): Promise<Result<MenuModel>> {
    const data = await this.MenuRepository.findTree(where);
    return data;
  }
  async findMenuRole(where: object): Promise<Result<MenuModel>> {
    console.log(where);
    const data = await this.MenuRepository.findMenuRole(where);
    return data;
  }
}
