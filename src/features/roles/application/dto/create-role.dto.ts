import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  @IsString()
  name: string;
  status: boolean;
}
