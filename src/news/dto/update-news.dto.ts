import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateNewsDto } from './create-news.dto';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  text: string;
}
