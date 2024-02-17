/* eslint-disable indent */
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Registry } from 'src/registry/entities/registry.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateSheetTimeDto {
  @IsString()
  @IsDefined()
  name: string;
  @IsBoolean()
  pending: boolean;
  @IsNumber()
  @IsDefined()
  user: number;
  @IsDate()
  @IsOptional()
  creaated_at: Date;
  @IsDate()
  @IsOptional()
  updated_at: Date;
}
export class UpdateSheetTimeDto {
  @IsNumber()
  @IsOptional()
  user_id: number;
  @IsBoolean()
  @IsOptional()
  pending: boolean;
  @IsDate()
  @IsOptional()
  updated_ad: Date;
}
export class SheetTimeDto {
  @IsNumber()
  id: number;
  @ValidateNested()
  @Type(() => User)
  user: User;
  @IsBoolean()
  pending: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Registry)
  registries: Registry[];
  @IsDate()
  creaated_at: Date;
  @IsDate()
  updated_ad: Date;
}
