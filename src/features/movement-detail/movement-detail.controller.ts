import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MovementDetailService } from './movement-detail.service';
import { CreateMovementDetailDto } from './application/dto/create-movement-detail.dto';
import { UpdateMovementDetailDto } from './application/dto/update-movement-detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/middlewares/auth/jwt.auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('movement-detail')
@Controller('movement-detail')
export class MovementDetailController {
  constructor(private readonly movementDetailService: MovementDetailService) {}

  @Post()
  create(@Body() createMovementDetailDto: CreateMovementDetailDto) {
    return this.movementDetailService.create(createMovementDetailDto);
  }

  @Get()
  findAll() {
    return this.movementDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movementDetailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovementDetailDto: UpdateMovementDetailDto,
  ) {
    return this.movementDetailService.update(+id, updateMovementDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movementDetailService.remove(+id);
  }
}
