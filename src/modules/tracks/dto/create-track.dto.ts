import {IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateTrackDto {
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
