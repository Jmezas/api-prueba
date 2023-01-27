import { IsString } from 'class-validator';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  @IsString()
  name: string;
  status: boolean;
}
