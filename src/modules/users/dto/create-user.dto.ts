import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsOptional()
  version: number;
  @IsOptional()
  createdAt: number;
  @IsOptional()
  updatedAt: number;
}
