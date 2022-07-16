import {IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class Album {
  id: string;
  name: string;
  artistId: string;
  yaer: number;
}
