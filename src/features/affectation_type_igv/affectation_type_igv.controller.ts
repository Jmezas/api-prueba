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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/middlewares/auth/jwt.auth.guard';
import { AffectationTypeIgvService } from './affectation_type_igv.service';
import { CreateAffectationTypeIgvDto } from './application/dto/create-affectation_type_igv.dto';
import { UpdateAffectationTypeIgvDto } from './application/dto/update-affectation_type_igv.dto';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('affectation-type-igv')
@Controller('affectation-type-igv')
export class AffectationTypeIgvController {
  constructor(
    private readonly affectationTypeIgvService: AffectationTypeIgvService,
  ) {}

  @Post()
  create(@Body() createAffectationTypeIgvDto: CreateAffectationTypeIgvDto) {
    return this.affectationTypeIgvService.create(createAffectationTypeIgvDto);
  }

  @Get()
  findAll() {
    return this.affectationTypeIgvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affectationTypeIgvService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAffectationTypeIgvDto: UpdateAffectationTypeIgvDto,
  ) {
    return this.affectationTypeIgvService.update(
      +id,
      updateAffectationTypeIgvDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affectationTypeIgvService.remove(+id);
  }
}
