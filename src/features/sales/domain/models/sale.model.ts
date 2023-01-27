import { CustomerEntity } from 'src/features/customers/domain/models/customer.entity';
import { DocumentTypeEntity } from 'src/features/document-type/domain/models/document-type.entity';
import { SaleDetailModel } from 'src/features/sale-details/domain/models/sale-detail.model';

export class SaleModel {
  constructor(
    public id: number,
    public details: SaleDetailModel[],
    public customer: number | CustomerEntity,
    public documentType: number | DocumentTypeEntity,
    public payment_condition: number | string,
    public issue_date: Date,
    public payment_date: Date,
    public serie: string,
    public number: number,
    public quantity: number,
    public recorded_operation: number,
    public unaffected_operation: number,
    public exempt_operation: number,
    public free_operation: number,
    public igv: number,
    public total_discount: number,
    public global_discount: Number,
    public total: number,
    public currency: string,
    public shipment_status: string,
    public status: boolean,
    public createdAt: Date,
  ) {}
}
