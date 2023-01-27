import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GeneralService } from './general.service';
import { CreateGeneralDto } from './application/dto/create-general.dto';
import { UpdateGeneralDto } from './application/dto/update-general.dto';
import { MatchQueryPipe } from 'src/common/match-query.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/middlewares/auth/jwt.auth.guard';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('general')
@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Post()
  create(@Body() createGeneralDto: CreateGeneralDto) {
    return this.generalService.create(createGeneralDto);
  }

  @Get()
  findAll(@Query(new MatchQueryPipe([])) query) {
    return this.generalService.findAll(query);
  }
  @Get('fullpage')
  fullpage(@Query(new MatchQueryPipe([])) query) {
    return this.generalService.fullpage(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGeneralDto: UpdateGeneralDto) {
    return this.generalService.update(+id, updateGeneralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalService.remove(+id);
  }
}
