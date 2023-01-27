import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/middlewares/auth/jwt.auth.guard';
import { ReportsService } from './reports.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Get('/salePDF/:id')
  async downloadPDF(@Param('id') id: string, @Res() res): Promise<void> {
    console.log('id', id);
    const doc = await this.reportsService.GeneratePDF(+id);
    // res.set({
    //   'content-type': 'application/pdf',
    //   'content-disposition': 'attachment; filename=invoice.pdf',
    //   'content-length': doc.length,
    // });
    // res.send(doc);
    res.send({
      //pdf: 'data:application/gzip;base64,' + doc,
      pdf: doc,
    });
  }

  @Get('/salePDFTikect/:id')
  async downloadPDFTikect(@Param('id') id: string, @Res() res) {
    const doc = await this.reportsService.GeneratePDFTikect(+id);
    //console.log('doc', doc);
    res.send({
      //pdf: 'data:application/gzip;base64,' + doc,
      pdf: doc,
    });
    // res.setHeader('Content-type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'attachment; filename=mypdf.pdf');
    // res.setHeader('Content-length', doc);
    //
    //return doc.toString('base64');
    // res.set({
    //   'content-type': 'application/pdf',
    //   'content-disposition': 'attachment; filename=invoice.pdf',
    //   'content-length': doc.length,
    // });
    // res.send(doc);
  }
}
