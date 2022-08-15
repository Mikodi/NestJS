import {
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  attachments?: string;
  id: number;
  @IsString()
  @MinLength(6)
  text: string;
}

export class AnswerToCommentDto {
  @IsNumber()
  @IsPositive()
  id: number;
  @IsString()
  @MinLength(6)
  text: string;
}
