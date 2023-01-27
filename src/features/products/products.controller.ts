import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './application/dto/update-product.dto';
import { CreateProductDto } from './application/dto/create-product.dto';
import { MatchQueryPipe } from 'src/common/match-query.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/middlewares/auth/jwt.auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() ProductDto: CreateProductDto) {
    return this.productsService.create(ProductDto);
  }

  @Get()
  findAll(@Query(new MatchQueryPipe([])) query) {
    return this.productsService.findAll(query);
  }
  @Get('fullpage')
  fullpage(@Query(new MatchQueryPipe([])) query) {
    return this.productsService.fullpage(query);
  }
  @Get('StockByWarehouse')
  getStockByWarehouse(@Query(new MatchQueryPipe([])) query) {
    return this.productsService.getStockByWarehouse(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
  @Get('stock/:product/:warehouse')
  checkStock(
    @Param('product') product: number,
    @Param('warehouse') warehouse: number,
  ) {
    return this.productsService.checkStock(product, warehouse);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
