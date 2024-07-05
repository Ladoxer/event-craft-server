import {  IsOptional, IsString } from "class-validator";

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly date: string;
}