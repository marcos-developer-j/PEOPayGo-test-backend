/* eslint-disable indent */
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDefined,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { RegistryDto } from 'src/registry/dto/registry.dto';

export class CreateUser {
  @IsString()
  name: string;
  @IsEmail()
  @IsDefined()
  email: string;
  @IsStrongPassword()
  @IsString()
  @IsDefined()
  password: string;
  @IsDefined()
  @IsString()
  @IsIn(['admin', 'customer'])
  role: string;
}
export class UpdateUser {
  @IsString()
  @IsOptional()
  name: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsStrongPassword()
  @IsString()
  @IsOptional()
  password: string;
}
export class UserInfo {
  @IsString()
  name: string;
  @IsEmail()
  @IsDefined()
  email: string;
  @IsStrongPassword()
  @IsString()
  @IsDefined()
  password: string;
  @IsDefined()
  @IsString()
  role: string;
  @IsDefined()
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegistryDto)
  registres: RegistryDto[];
}
