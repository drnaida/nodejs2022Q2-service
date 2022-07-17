import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
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
