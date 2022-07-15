import {IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  artistId: string;
  @IsString()
  @IsOptional()
  albumId: string;
  @IsNotEmpty()
  @IsInt()
  duration: number;
}
