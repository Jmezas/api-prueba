import { CustomerEntity } from 'src/features/customers/domain/models/customer.entity';
import { DocumentTypeEntity } from 'src/features/document-type/domain/models/document-type.entity';
import { GeneralEntity } from 'src/features/general/domain/models/general.entity';
import { SaleDetailModel } from 'src/features/sale-details/domain/models/sale-detail.model';
import { SaleModel } from './sale.model';

export interface ISale {
  id: number;
  createdAt: Date;
  status: boolean;
  customer: number | CustomerEntity;
  details: SaleDetailModel[];
  documentType: number | DocumentTypeEntity;
  payment_condition: number | string;
  issue_date: Date;
  payment_date: Date;
  serie: string;
  number: number;
  quantity: number;
  recorded_operation: number;
  unaffected_operation: number;
  exempt_operation: number;
  free_operation: number;
  igv: number;
  total_discount: number;
  global_discount: Number;
  total: number;
  currency: string;
  shipment_status: string;
}
export class SaleFactory {
  create(sale: Partial<ISale>) {
    const id = sale.id || 0;
    const status = sale.status || true;
    const createdAt = sale.createdAt;
    const details = sale.details;
    const customer = sale.customer;
    const documentType = sale.documentType;
    const payment_condition = sale.payment_condition;
    const serie = sale.serie;
    const number = sale.number;
    const issue_date = sale.issue_date;
    const payment_date = sale.payment_date;
    const quantity = sale.quantity;
    const recorded_operation = sale.recorded_operation;
    const unaffected_operation = sale.unaffected_operation;
    const exempt_operation = sale.exempt_operation;
    const free_operation = sale.free_operation;
    const igv = sale.igv;
    const total_discount = sale.total_discount;
    const global_discount = sale.global_discount;
    const total = sale.total;
    const currency = sale.currency;
    const shipment_status = sale.shipment_status;

    return new SaleModel(
      id,
      details,
      customer,
      documentType,
      payment_condition,
      issue_date,
      payment_date,
      serie,
      number,
      quantity,
      recorded_operation,
      unaffected_operation,
      exempt_operation,
      free_operation,
      igv,
      total_discount,
      global_discount,
      total,
      currency,
      shipment_status,
      status,
      createdAt,
    );
  }
}
