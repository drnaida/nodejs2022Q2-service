import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  artistId: string | null;
  @IsNotEmpty()
  @IsInt()
  year: number;
}
