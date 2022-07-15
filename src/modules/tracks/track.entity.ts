import {IsInt, IsNotEmpty, IsString} from "class-validator";

export class Artist {
  id: string;
  name: string;
  artistId: string;
  albumId: string;
  duration: number;
}
