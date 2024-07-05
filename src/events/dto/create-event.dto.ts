import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;
}