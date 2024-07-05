import { IsNotEmpty, IsString } from "class-validator";

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly date: string;

  @IsString()
  @IsNotEmpty()
  organizer: string;
}