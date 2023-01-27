import { Injectable } from '@nestjs/common';
import { CompanyApplication } from '../company/application/company.application';
import { SaleApplication } from '../sales/application/sale.application';
import { SaleModel } from '../sales/domain/models/sale.model';

import * as qrcode from 'qrcode';
import { converBase64ToImage } from 'convert-base64-to-image';
import { enletras } from 'src/common/NumLetras';
import { ConvertMoneda } from 'src/common/convertMoneda';
import { CompanyModel } from '../company/domain/models/company.model';
const PDFDocument = require('pdfkit');
var { Base64Encode } = require('base64-stream');
//import { Base64Encode } from 'base64-stream';
@Injectable()
export class ReportsService {
  constructor(
    private ApplicationSale: SaleApplication,
    private ApplicationCompany: CompanyApplication,
  ) {}
  async GeneratePDF(id: number): Promise<any> {
    const pdfBuffer: any = await new Promise(async (resolve) => {
      const sale = await this.ApplicationSale.findByOne({ id }, [
        'documentType',
        'details',
        'customer',
      ]);
      const company = await this.ApplicationCompany.findByOne({ id: 1 }, []); //1 por defecto!
      const invoice = sale.payload.data as SaleModel; // SaleModel
      const emp = company.payload.data;
      const dorq = await qrcode.toDataURL('https://www.google.com/');
      const path = converBase64ToImage(dorq, './image.png');

      //create a document pdf
      let doc = new PDFDocument({ margin: 20, size: 'A4' });
      this.generateHeader(doc, emp, invoice);
      this.generateCustomerInformation(doc, invoice);
      this.generateInvoiceTable(doc, invoice);
      this.generateFooter(doc);
      const buffer = [];
      // doc.on('data', buffer.push.bind(buffer));
      // doc.on('end', () => {
      //   const data = Buffer.concat(buffer);
      //   resolve(data);
      // });
      // doc.end();
      let finalString = '';
      var stream = doc.pipe(new Base64Encode());

      doc.end();
      // console.log('stream', stream);
      stream.on('data', function (chunk) {
        finalString += chunk;
      });
      stream.on('end', function () {
        // the stream is at its end, so push the resulting base64 string to the response
        resolve(finalString);
      });
    });
    return pdfBuffer;
  }

  async GeneratePDFTikect(id: number): Promise<any> {
    const pdfBuffer: any = await new Promise(async (resolve) => {
      const sale = await this.ApplicationSale.findByOne({ id }, [
        'documentType',
        'details',
        'customer',
      ]);
      const company = await this.ApplicationCompany.findByOne({ id: 1 }, []); //1 por defecto!
      const invoice = sale.payload.data as SaleModel; // SaleModel
      const emp = company.payload.data as CompanyModel;
      const dorq = await qrcode.toDataURL('https://www.google.com/');
      const path = converBase64ToImage(dorq, './image.png');

      //create a document pdf
      let doc = new PDFDocument({
        size: [500, 3000],
        margin: 20,
      });

      this.generateHeaderTicket(doc, emp, invoice);
      this.generateCustomerInformationTicket(doc, invoice);
      this.generateInvoiceTableTicket(doc, invoice);
      const buffer = [];
      // doc.on('data', buffer.push.bind(buffer));
      // doc.on('end', () => {
      //   const data = Buffer.concat(buffer);

      //   resolve(data);
      // });
      let finalString = '';
      var stream = doc.pipe(new Base64Encode());

      doc.end();
      // console.log('stream', stream);
      stream.on('data', function (chunk) {
        finalString += chunk;
      });
      stream.on('end', function () {
        // the stream is at its end, so push the resulting base64 string to the response
        resolve(finalString);
      });
    });
    return pdfBuffer;
  }
  generateHeaderTicket(doc, emp, invoice) {
    doc
      .image('assets/images/company/logo.png', 225, 10, { width: 50 })
      .font('Times-Bold')
      .fontSize(20)
      .text(emp.ruc, 0, 60, {
        align: 'center',
        color: 'black',
        font: 'Bold',
      })
      .text(emp.name, 0, 80, {
        align: 'center',
        color: 'black',
        font: 'Bold',
      })
      .fontSize(8)
      .font('Times-Roman')
      .text(emp.address, 170, 110, { align: 'center', width: 150 })
      .fontSize(15)
      .moveDown();
    this.genertateHRTicket(doc, 160);
    doc
      .font('Times-Bold')
      .fontSize(12)
      .text(`${invoice.documentType.name}`, 0, 165, { align: 'center' })
      .text(
        `${invoice.serie}- ${invoice.number.toString().padStart(6, '0')}`,
        0,
        180,
        { align: 'center' },
      )
      .moveDown();
  }
  generateCustomerInformationTicket(doc, invoice) {
    this.genertateHRTicket(doc, 195);
    doc
      .font('Times-Bold')
      .fontSize(12)
      .text('FECHA EMISIÓN: ', 20, 200)
      .font('Times-Roman')
      .text(this.formatDate(invoice.issue_date), 120, 200)
      .font('Times-Bold')
      .text('RUC / DNI:', 20, 220)
      .font('Times-Roman')
      .text(invoice.customer.nroDocumento, 120, 220)
      .font('Times-Bold')
      .text('SEÑORES:', 20, 240)
      .font('Times-Roman')
      .text(invoice.customer.name, 120, 240)
      .font('Times-Bold')
      .text('DIRECCIÓN:', 20, 260)
      .font('Times-Roman')
      .text(invoice.customer.address, 120, 260);
  }
  generateInvoiceTableTicket(doc, invoice) {
    this.genertateHRTicket(doc, 300);
    let i;
    const invoiceTableTop = 300;
    doc.font('Helvetica-Bold');
    this.generateTableRowHederTicket(
      doc,
      invoiceTableTop + 8,
      'CANT.',
      'UNID',
      'CÓDIGO',
      'DESCRIPCIÓN',
      'PRECIO',
      'DESCUENTO',
      'TOTAL',
    );
    this.genertateHRTicket(doc, invoiceTableTop + 20);
    doc.font('Helvetica');
    for (i = 0; i < invoice.details.length; i++) {
      const item = invoice.details[i];
      const position = invoiceTableTop + (i + 1) * 25;
      this.generateTableRowTicket(
        doc,
        position,
        item.quantity,
        item.product.unit.name,
        item.product.code,
        item.product.name,
        this.formatCurrency(item.price),
        this.formatCurrency(item.discount),
        this.formatCurrency(item.total),
      );
    }
    this.genertateHRTicket(doc, invoiceTableTop + (i + 1) * 25);
    const paidToDatePosition = invoiceTableTop + (i + 1) * 28;
    doc
      //letra en totales
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('SON: ', 20, paidToDatePosition)
      .font('Helvetica')
      .text(enletras(invoice.total), 50, paidToDatePosition)
      .moveDown();

    doc
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('Ope. Grabada: ', 300, paidToDatePosition + 20)
      .text(
        this.formatCurrency(invoice.recorded_operation),
        400,
        paidToDatePosition + 20,
        {
          align: 'right',
        },
      )
      .text('Ope. Exonerada: ', 300, paidToDatePosition + 35)
      .text(
        this.formatCurrency(invoice.unaffected_operation),
        400,
        paidToDatePosition + 35,
        {
          align: 'right',
        },
      )

      .text('Ope. Inafecta: ', 300, paidToDatePosition + 50)
      .text(
        this.formatCurrency(invoice.exempt_operation),
        300,
        paidToDatePosition + 50,
        {
          align: 'right',
        },
      )

      .text('Ope. Gratuita: ', 300, paidToDatePosition + 65)
      .text(
        this.formatCurrency(invoice.free_operation),
        400,
        paidToDatePosition + 65,
        {
          align: 'right',
        },
      )

      .text('Total Descuento: ', 300, paidToDatePosition + 80)
      .text(
        this.formatCurrency(invoice.total_discount),
        400,
        paidToDatePosition + 80,
        {
          align: 'right',
        },
      )

      .text('Total I.G.V (18%): ', 300, paidToDatePosition + 95)
      .text(this.formatCurrency(invoice.igv), 400, paidToDatePosition + 95, {
        align: 'right',
      })

      .text('Total: ', 300, paidToDatePosition + 110)
      .text(this.formatCurrency(invoice.total), 400, paidToDatePosition + 110, {
        align: 'right',
      })

      .text('Momenda: ', 300, paidToDatePosition + 125)
      .text(ConvertMoneda(invoice.currency), 400, paidToDatePosition + 125, {
        align: 'right',
      });
    this.genertateHRTicket(doc, paidToDatePosition + 140);
    doc.image('image.png', 180, paidToDatePosition + 160, { width: 150 });

    //footer
    doc
      .fontSize(10)
      .text(
        'Representacion impresa del Comprobante de Venta Electronica',
        0,
        paidToDatePosition + 300,
        {
          align: 'center',
          width: 500,
        },
      );
  }

  generateTableRowHederTicket(
    doc,
    y,
    cantidad,
    unid,
    codigo,
    description,
    precio,
    Descuento,
    total,
  ) {
    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .text(cantidad, 20, y)
      .text(unid, 60, y)
      .text(codigo, 100, y, { width: 60, align: 'center' })
      .text(description, 160, y, { width: 180, align: 'center' })
      .text(precio, 200, y, { align: 'center' })
      .text(Descuento, 320, y, { align: 'center' })
      .text(total, 445, y, { align: 'right' });
  }

  generateTableRowTicket(
    doc,
    y,
    cantidad,
    unid,
    codigo,
    description,
    precio,
    Descuento,
    total,
  ) {
    doc
      .fontSize(10)
      .font('Helvetica')
      .text(cantidad, 25, y)
      .text(unid, 60, y)
      .text(codigo, 100, y, { width: 60, align: 'center' })
      .text(description, 160, y, { width: 180 })
      .text(precio, 200, y, { align: 'center' })
      .text(Descuento, 320, y, { align: 'center' })
      .text(total, 420, y, { align: 'right' });
  }

  genertateHRTicket(doc, y) {
    doc
      .strokeColor('#000000')
      .lineWidth(1)
      .moveTo(20, y)
      .lineTo(490, y)
      .stroke();
  }

  //pdf
  generateHeader(doc, emp, invoice) {
    doc
      .image('assets/images/company/logo.png', 50, 50, { width: 50 })
      .font('Times-Bold')
      .fontSize(20)
      .text(emp.name, 0, 50, {
        align: 'center',
        color: 'black',
        font: 'Bold',
      })
      .fontSize(8)
      .font('Times-Roman')
      .text(emp.address, 200, 70, { align: 'center', width: 170 })
      .fontSize(15)
      .font('Times-Bold')
      .text(`RUC: ${emp.ruc}`, 400, 50, { align: 'center' })

      .text(`${invoice.documentType.name}`, 400, 65, { align: 'center' })
      .text(
        `${invoice.serie} - ${invoice.number.toString().padStart(6, '0')}`,
        400,
        80,
        {
          align: 'center',
        },
      )
      .moveDown();
  }

  generateCustomerInformation(doc, invoice) {
    this.generateHr(doc, 120);

    const customerInformationTop = 140;

    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .text('SEÑORES:', 20, customerInformationTop)
      .font('Helvetica')
      .text(invoice.customer.name, 120, customerInformationTop, { width: 250 })
      .font('Helvetica-Bold')
      .text('TELÉFONO:', 20, customerInformationTop + 25)
      .font('Helvetica')
      .text(invoice.customer.phone, 120, customerInformationTop + 25)
      .font('Helvetica-Bold')
      .text('DIRECCIÓN:', 20, customerInformationTop + 50)
      .font('Helvetica')
      .text(invoice.customer.address, 120, customerInformationTop + 50, {
        width: 250,
      })
      .font('Helvetica-Bold')
      .text('CONDICIONES DE PAGO:', 20, customerInformationTop + 90, {
        width: 80,
      })
      .font('Helvetica')
      .text(invoice.payment_condition, 150, customerInformationTop + 90, {
        width: 250,
      })

      .fontSize(10)
      .font('Helvetica-Bold')
      .text('N° RUC:', 400, customerInformationTop)
      .font('Helvetica')
      .text(invoice.customer.nroDocumento, 500, customerInformationTop)
      .font('Helvetica-Bold')
      .text('FECHA EMISIÓN:', 400, customerInformationTop + 15)
      .font('Helvetica')
      .text(
        this.formatDate(invoice.issue_date),
        500,
        customerInformationTop + 15,
      )

      .moveDown();

    // this.generateHr(doc, 285);
  }

  generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 280;
    this.generateHr(doc, invoiceTableTop - 10);
    doc.font('Helvetica-Bold');
    this.generateTableRowHeder(
      doc,
      invoiceTableTop,
      'CANT.',
      'UNID',
      'CÓDIGO',
      'DESCRIPCIÓN',
      'PRECIO',
      'DESCUENTO',
      'TOTAL',
    );
    this.generateHr(doc, invoiceTableTop + 10);
    doc.font('Helvetica');

    for (i = 0; i < invoice.details.length; i++) {
      const item = invoice.details[i];
      const position = invoiceTableTop + (i + 1) * 20;
      this.generateTableRow(
        doc,
        position,
        item.quantity,
        item.product.unit.name,
        item.product.code,
        item.product.name,
        this.formatCurrency(item.price),
        this.formatCurrency(item.discount),
        this.formatCurrency(item.total),
      );

      // this.generateHr(doc, position + 10);
    }
    this.generateHr(doc, invoiceTableTop + (i + 1) * 22);

    const paidToDatePositionMoneda = invoiceTableTop + (i + 1) * 23;
    doc
      //letra en totales
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('SON: ', 20, paidToDatePositionMoneda)
      .font('Helvetica')
      .text(enletras(invoice.total), 100, paidToDatePositionMoneda)
      .moveDown();
    //totales
    const paidToDatePosition = 645;
    doc
      .image('image.png', 50, paidToDatePosition + 20, { width: 120 })
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('Ope. Grabada: ', 350, paidToDatePosition + 20)
      .text(
        this.formatCurrency(invoice.recorded_operation),
        500,
        paidToDatePosition + 20,
        {
          align: 'right',
        },
      )

      .text('Ope. Exonerada: ', 350, paidToDatePosition + 35)
      .text(
        this.formatCurrency(invoice.unaffected_operation),
        500,
        paidToDatePosition + 35,
        {
          align: 'right',
        },
      )

      .text('Ope. Inafecta: ', 350, paidToDatePosition + 50)
      .text(
        this.formatCurrency(invoice.exempt_operation),
        500,
        paidToDatePosition + 50,
        {
          align: 'right',
        },
      )

      .text('Ope. Gratuita: ', 350, paidToDatePosition + 65)
      .text(
        this.formatCurrency(invoice.free_operation),
        500,
        paidToDatePosition + 65,
        {
          align: 'right',
        },
      )

      .text('Total Descuento: ', 350, paidToDatePosition + 80)
      .text(
        this.formatCurrency(invoice.total_discount),
        500,
        paidToDatePosition + 80,
        {
          align: 'right',
        },
      )

      .text('Total I.G.V (18%): ', 350, paidToDatePosition + 95)
      .text(this.formatCurrency(invoice.igv), 500, paidToDatePosition + 95, {
        align: 'right',
      })

      .text('Total: ', 350, paidToDatePosition + 110)
      .text(this.formatCurrency(invoice.total), 500, paidToDatePosition + 110, {
        align: 'right',
      })

      .text('Momenda: ', 350, paidToDatePosition + 125)
      .text(ConvertMoneda(invoice.currency), 500, paidToDatePosition + 125, {
        align: 'right',
      });
  }

  generateFooter(doc) {
    doc.fontSize(10).text('Gracias por su confianza.', 50, 790, {
      align: 'center',
      width: 500,
    });
  }

  generateTableRowHeder(
    doc,
    y,
    cantidad,
    unid,
    codigo,
    description,
    precio,
    descuento,
    total,
  ) {
    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .text(cantidad, 20, y)
      .text(unid, 60, y)
      .text(codigo, 80, y, { width: 90, align: 'center' })
      .text(description, 180, y, { width: 150, align: 'center' })
      .text(precio, 380, y)
      .text(descuento, 450, y)
      .text(total, 520, y);
  }

  generateTableRow(
    doc,
    y,
    cantidad,
    unid,
    codigo,
    description,
    precio,
    descuento,
    total,
  ) {
    doc
      .fontSize(10)
      .font('Helvetica')
      .text(cantidad, 25, y)
      .text(unid, 60, y)
      .text(codigo, 80, y, { width: 100, align: 'center' })
      .text(description, 180, y, { width: 150, align: 'center' })
      .text(precio, 380, y)
      .text(descuento, 450, y)
      .text(total, 520, y);
  }

  generateHr(doc, y) {
    doc
      .strokeColor('#000000')
      .lineWidth(2)
      .moveTo(10, y)
      .lineTo(570, y)
      .stroke();
  }

  formatCurrency(cents) {
    return 'S/ ' + Number(cents).toFixed(2);
  }

  formatDate(date) {
    const day = date.split('-')[0];
    const month = date.split('-')[1];
    const year = date.split('-')[2];

    return year + '/' + month + '/' + day;
  }
}
