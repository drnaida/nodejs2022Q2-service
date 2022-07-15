import {IsBoolean, IsInt, IsNotEmpty, IsString} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  artistId: string;
  @IsNotEmpty()
  @IsString()
  albumId: string;
  @IsNotEmpty()
  @IsInt()
  duration: number;
}
