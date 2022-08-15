import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  title: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  text: string;
  thumbnail: string;
}

export class Attachments {
  attachments: string;
}
