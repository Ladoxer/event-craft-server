import { IsNotEmpty, IsString } from "class-validator";

export class RsvpDto {
  @IsString()
  @IsNotEmpty()
  user: string;
}