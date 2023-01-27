import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MatchQueryPipe } from 'src/common/match-query.pipe';
import { JwtAuthGuard } from 'src/common/middlewares/auth/jwt.auth.guard';
import { CreateCustomerDto } from './application/dto/create-customer.dto';
import { UpdateCustomerDto } from './application/dto/update-customer.dto';
import { CustomersService } from './customers.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll(@Query(new MatchQueryPipe([])) query) {
    return this.customersService.findAll(query);
  }

  @Get('fullpage')
  fullpage(@Query(new MatchQueryPipe([])) query) {
    return this.customersService.fullpage(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
