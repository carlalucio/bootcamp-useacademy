import { CourseEntity } from '../../entities/course.entity';
import { CreateCourseDto } from './create-course.dto';

export class CreatedCourseDto extends CreateCourseDto {
  id!: string;

  constructor({ id, name, description,value,image,disponibility,category_id}: CourseEntity) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.value = value;
    this.image = image;
    this.disponibility = disponibility;
    this.category_id = category_id;
  }
}