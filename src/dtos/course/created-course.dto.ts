import { CourseEntity } from '../../entities/course.entity';
import { CreateCourseDto } from './create-course.dto';

export class CreatedCourseDto extends CreateCourseDto {
  id!: string;

  constructor({ id, name }: CourseEntity) {
    super();
    this.id = id;
    this.name = name;
  }
}