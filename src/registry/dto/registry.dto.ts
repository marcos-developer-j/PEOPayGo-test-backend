/* eslint-disable indent */
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { SheetTime } from 'src/sheet-time/entities/sheet-time.entity';

export class CreateRegistryDto {
  @IsString()
  employe: string;
  @IsNumber()
  @Min(0)
  @Max(12.0)
  hourly_rate: number;
  @IsNumber()
  @IsDefined()
  hours: number;
  @IsNumber()
  @Min(100)
  total: number;
  @IsDate()
  @IsOptional()
  created_at: Date;
  @IsDate()
  @IsOptional()
  updated_at: Date;
  // eslint-disable-next-line camelcase
  @IsNumber()
  @IsDefined()
  sheet_time: number;
}
export class UpdateRegistryDto {
  @IsString()
  @IsOptional()
  employe: string;
  @IsNumber()
  @IsOptional()
  hourly_rate: number;
  @IsNumber()
  @IsOptional()
  hours: number;
  @IsNumber()
  @IsOptional()
  total: number;
  @IsDate()
  @IsOptional()
  updated_at: Date;
  @IsNumber()
  @IsOptional()
  sheet_time_id: number;
}

export class RegistryDto {
  @IsNumber()
  id: number;
  @IsString()
  employe: string;
  @IsNumber()
  hourly_rate: number;
  @IsNumber()
  hours: number;
  @IsNumber()
  total: number;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date;
  // eslint-disable-next-line camelcase
  @ValidateNested()
  @Type(() => SheetTime)
  sheet_time: SheetTime;
}
