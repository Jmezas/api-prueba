import { Inject, Injectable } from '@nestjs/common';
import { CustomerEntity } from 'src/features/customers/domain/models/customer.entity';
import { CustomerRepository } from 'src/features/customers/domain/repositories/customer.repository';
import { SaleDetailRepository } from 'src/features/sale-details/domain/respositories/sale-detail.repository';
import { ResponseDto } from 'src/features/shared/application/interfaces/dtos/response.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { Trace } from 'src/features/shared/helpers/trace.helper';
import { SaleEntity } from '../domain/models/sale.entity';
import { SaleModel } from '../domain/models/sale.model';
import { SaleRepository } from '../domain/respositories/sale.repository';
import { SaleDto } from './dto/dto';
import { GeneralRepository } from 'src/features/general/domain/repositories/general.repository';
import { DocumentTypeEntity } from 'src/features/document-type/domain/models/document-type.entity';
import { MovementRepository } from 'src/features/movement/domain/repositories/movement.repository';
import { MovementModel } from 'src/features/movement/domain/models/movement.model';
import { MovementDetailRepository } from 'src/features/movement-detail/domain/repositories/movement-detail.repository';
import { MovementDetailModel } from 'src/features/movement-detail/domain/models/movement-detail.model';
import { MovementDto } from 'src/features/movement/application/dto/dto';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { DocumentTypeRepository } from 'src/features/document-type/domain/repositories/document-type.respository';

@Injectable()
export class SaleApplication extends BaseApplication<SaleModel> {
  constructor(
    @Inject('SaleRepository')
    private saleRepository: SaleRepository,
    @Inject('SaleDetailRepository')
    private detailsaleRepository: SaleDetailRepository,
    @Inject('CustomerRepository')
    private customerRepository: CustomerRepository,
    @Inject('DocumentTypeRepository')
    private DocumentTypeRepository: DocumentTypeRepository,
    @Inject('GeneralRepository')
    private GeneralRepository: GeneralRepository,
    @Inject('MovementRepository')
    private MovementRepository: MovementRepository,
    @Inject('MovementDetailRepository')
    private detailMovementRepository: MovementDetailRepository,
  ) {
    super(saleRepository, new SaleDto());
  }

  async insertData(entity: SaleModel): Promise<Result<SaleModel>> {
    let detalle = entity.details;
    delete entity.details;
    const data = await this.saleRepository.insertSale(entity);
    const customer = await this.customerRepository.findByOne(
      { id: data.customer },
      [],
    );

    //actualizar tipo documento
    const documentType = await this.DocumentTypeRepository.findByOne(
      { id: data.documentType },
      [],
    );

    const body = {
      id: data.documentType,
      number: documentType.payload.data['number'] + 1,
    } as DocumentTypeEntity;

    const put = await this.DocumentTypeRepository.update(body, {}, []);

    //detalle
    let detaillist = [];
    for (const detail of detalle) {
      detail.sale = data.id as unknown as SaleEntity;
      const res = await this.detailsaleRepository.insertDetail(detail);
      detaillist.push(res);
    }
    data.customer = customer.payload.data as unknown as CustomerEntity;
    data.documentType = put.payload.data as unknown as DocumentTypeEntity;
    data.details = detaillist; //detail.payload.data as unknown as SaleDetailEntity[];

    // dereference sale entity in all details
    for (const detail of data.details) {
      delete detail.sale;
    }

    //insert movimiento
    this.insertMovement(data);

    const result = ResponseDto<SaleModel>(Trace.TraceId(), data);

    return new SaleDto().mapping(result);
  }

  //funcion para insertartar movimiento
  async insertMovement(entity: SaleModel): Promise<Result<MovementModel>> {
    const last = await this.MovementRepository.findBylast();

    let insertMovement: MovementModel = {
      issue_date: entity.issue_date,
      serie: '001',
      number: last ? last[0].number + 1 : 1,
      type: 2,
      currency: entity.currency,
      quantity: entity.quantity,
      recorded_operation: entity.recorded_operation,
      unaffected_operation: entity.unaffected_operation,
      exempt_operation: entity.exempt_operation,
      free_operation: entity.free_operation,
      igv: entity.igv,
      total: entity.total,
      observation: null,
      operationType: 1, //Venta nacional
    } as MovementModel;
    const data = await this.MovementRepository.insertMovement(insertMovement);
    let detaillist = [];
    for (const detail of entity.details) {
      let insertDetail: MovementDetailModel = {
        unit: detail.unit,
        quantity: detail.quantity,
        price: detail.price,
        discount: detail.discount,
        igv: detail.igv,
        total: detail.total,
        product: detail.product,
        movement: data,
      } as MovementDetailModel;
      const res = await this.detailMovementRepository.insert(insertDetail);
      detaillist.push(res);
    }
    data.details = detaillist;

    const result = ResponseDto<MovementModel>(Trace.TraceId(), data);
    return new MovementDto().mapping(result);
  }
}
