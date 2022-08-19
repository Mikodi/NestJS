import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsNumber()
  @IsPositive()
  id: number;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  text: string;
}
