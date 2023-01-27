import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OperationTypeService } from './operation_type.service';
import { CreateOperationTypeDto } from './application/dto/create-operation_type.dto';
import { UpdateOperationTypeDto } from './application/dto/update-operation_type.dto';
import { Put, Query, UseGuards } from '@nestjs/common/decorators';
import { MatchQueryPipe } from 'src/common/match-query.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/middlewares/auth/jwt.auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('operation-type')
@Controller('operation-type')
export class OperationTypeController {
  constructor(private readonly operationTypeService: OperationTypeService) {}

  @Post()
  create(@Body() createOperationTypeDto: CreateOperationTypeDto[]) {
    return this.operationTypeService.create(createOperationTypeDto);
  }

  @Get()
  findAll() {
    return this.operationTypeService.findAll();
  }
  @Get('fullpage')
  fullpage(@Query(new MatchQueryPipe([])) query) {
    return this.operationTypeService.fullpage(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationTypeService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperationTypeDto: UpdateOperationTypeDto,
  ) {
    return this.operationTypeService.update(+id, updateOperationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationTypeService.remove(+id);
  }
}
