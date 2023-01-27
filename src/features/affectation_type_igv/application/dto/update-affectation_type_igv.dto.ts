import { PartialType } from '@nestjs/swagger';
import { CreateAffectationTypeIgvDto } from './create-affectation_type_igv.dto';

export class UpdateAffectationTypeIgvDto extends PartialType(CreateAffectationTypeIgvDto) {}
