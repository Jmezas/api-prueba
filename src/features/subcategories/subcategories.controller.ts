import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Put, UseGuards } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MatchQueryPipe } from 'src/common/match-query.pipe';
import { JwtAuthGuard } from 'src/common/middlewares/auth/jwt.auth.guard';
import { CreateSubcategoryDto } from './application/dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './application/dto/update-subcategory.dto';
import { SubcategoriesService } from './subcategories.service';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('subcategories')
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoriesService.create(createSubcategoryDto);
  }

  @Get()
  findAll() {
    return this.subcategoriesService.findAll();
  }
  @Get('fullpage')
  fullpage(@Query(new MatchQueryPipe([])) query) {
    return this.subcategoriesService.fullpage(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return this.subcategoriesService.update(+id, updateSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(+id);
  }
}
