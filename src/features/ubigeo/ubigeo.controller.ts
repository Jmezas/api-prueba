import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UbigeoService } from './ubigeo.service';
import { CreateUbigeoDto } from './application/dto/create-ubigeo.dto';
import { UpdateUbigeoDto } from './application/dto/update-ubigeo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/middlewares/auth/jwt.auth.guard';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('ubigeo')
@Controller('ubigeo')
export class UbigeoController {
  constructor(private readonly ubigeoService: UbigeoService) {}

  @Post()
  create(@Body() createUbigeoDto: CreateUbigeoDto[]) {
    return this.ubigeoService.create(createUbigeoDto);
  }

  @Get()
  findAll() {
    return this.ubigeoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ubigeoService.findOne(+id);
  }
  @Get(':action/:departamento/:provincia/:distrito')
  findMultiple(
    @Param('action') accion: string,
    @Param('departamento') departamento: string,
    @Param('provincia') provincia: string,
    @Param('distrito') distrito: string,
  ) {
    return this.ubigeoService.findmultiple(
      accion,
      departamento,
      provincia,
      distrito,
    );
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUbigeoDto: UpdateUbigeoDto) {
    return this.ubigeoService.update(+id, updateUbigeoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ubigeoService.remove(+id);
  }
}
