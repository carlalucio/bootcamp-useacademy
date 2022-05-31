import { CourseEntity } from '../../entities/course.entity';
import { CreateCourseDto } from './create-course.dto';

export class CreatedCourseDto extends CreateCourseDto {
  id!: string;
  
  constructor({ id, name, description,value,image,disponibility,category}: CourseEntity) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.value = value;
    this.image = image;
    this.disponibility = disponibility = 
    typeof disponibility ==='string' && disponibility === 'true'
    ? true
    :false;
    this.categoryId = category.id;    
  }
}