import { IsOptional, IsString } from "class-validator";

export class FilterEventDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsString()
  date?: string;
}