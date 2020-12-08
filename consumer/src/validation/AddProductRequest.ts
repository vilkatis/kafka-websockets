import { IsString, MinLength } from 'class-validator';

export class AddProductRequest {
  @IsString()
  @MinLength(3)
  productName: string;
}
