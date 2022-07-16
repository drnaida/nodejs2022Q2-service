import {IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateFavoriteDto {
  @IsOptional()
  @IsArray()
  artists: string[];
  @IsArray()
  @IsOptional()
  albums: string[];
  @IsArray()
  @IsOptional()
  tracks: string[];
}
