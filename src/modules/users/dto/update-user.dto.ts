import {IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassowrd: string;
  @IsNotEmpty()
  @IsString()
  newPassowrd: string;
}
