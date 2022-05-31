import { body, ValidationChain } from 'express-validator';
import { CreateCourseDto } from './create-course.dto';
export class UpdateCourseDto extends CreateCourseDto{
    static validators(): ValidationChain[] {
        return [
          body('name', 'Valor name não é uma string!').optional().isString(),
          body("description","O campo description deve ser uma string!").optional().isString(),
          body("value", "O campo value deve ser um número!").optional().isNumeric(),
          body("disponibility", "O campo disponibility deve ser um booleano!").optional().isBoolean(),
          body("categoryId", "O campo categoryId deve ser uma string!").optional().isString(),
          body("categoryId", "O campo categoryId deve ser um UUID!").optional().isUUID(),
        ];
      }
}