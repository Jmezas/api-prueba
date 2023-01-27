import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './application/dto/sale.create.dto';
import { MatchQueryPipe } from 'src/common/match-query.pipe';
import { JwtAuthGuard } from 'src/common/middlewares/auth/jwt.auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() CreateSaleDto: CreateSaleDto) {
    return this.salesService.create(CreateSaleDto);
  }
  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get('/fullpage')
  fullpage(@Query(new MatchQueryPipe([])) query) {
    try {
      return this.salesService.fullpage(query);
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   console.log('findOne', id);
  //   return this.salesService.findOne(+id);
  // }
}
