import { body, ValidationChain } from 'express-validator';
import { RequestDto } from '../request-dto/request.dto';

export class CreateCourseDto extends RequestDto {
  name!: string;
  description!: string;
  value!: number;
  image!: string;
  disponibility!: boolean;
  category_id!: string;

  static validators(): ValidationChain[] {
    return [
      body('name', 'Valor name não é uma string!').isString(),
      body('name', 'O campo name é obrigatório!'),
      body('description', 'Valor description não é uma string!').isString(),
      body('description', 'O campo description é obrigatório!'),
      body('image', 'Valor image não é uma string!').isString(),
      body('image', 'O campo image é obrigatório!')
      .not()
      .isEmpty({ ignore_whitespace: true }),
    ];
  }
}