import { PartialType } from '@nestjs/swagger';
import { CreateOperationTypeDto } from './create-operation_type.dto';

export class UpdateOperationTypeDto extends PartialType(CreateOperationTypeDto) {}
