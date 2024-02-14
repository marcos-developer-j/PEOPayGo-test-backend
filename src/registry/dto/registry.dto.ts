/* eslint-disable indent */
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SheetTime } from 'src/sheet-time/entities/sheet-time.entity';

export class CreateRegistryDto {
  @IsString()
  employe: string;
  @IsNumber()
  hourly_rate: number;
  @IsNumber()
  hours: number;
  @IsNumber()
  total: number;
  @IsDate()
  creaated_at: Date;
  @IsDate()
  updated_ad: Date;
  // eslint-disable-next-line camelcase
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
  @IsDefined()
  updated_ad: Date;
  @IsNumber()
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
  creaated_at: Date;
  @IsDate()
  updated_ad: Date;
  // eslint-disable-next-line camelcase
  @ValidateNested()
  @Type(() => SheetTime)
  sheet_time: SheetTime;
}
