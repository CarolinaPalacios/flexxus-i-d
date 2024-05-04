import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  MinLength,
} from "class-validator";

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  brand?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  brand!: string;
}
