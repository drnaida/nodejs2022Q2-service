import {IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  artistId: string;
  @IsNotEmpty()
  @IsInt()
  year: number;
}
