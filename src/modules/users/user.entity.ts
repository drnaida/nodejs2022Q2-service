import {IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
