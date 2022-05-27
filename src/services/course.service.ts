import { DataSource, Repository } from 'typeorm';
import { CreateCourseDto } from '../dtos/course/create-course.dto';
import { CreatedCourseDto} from '../dtos/course/created-course.dto';
import { CourseEntity } from '../entities/course.entity';
import { HttpException } from '../handler-exceptions/http-exception.provider';
import { HttpStatus } from '../utils/enums/http-status.enum';

export class CourseService {
  private courseRepository: Repository<CourseEntity>;
  constructor(private readonly connection: DataSource) {
    this.courseRepository = this.connection.getRepository(CourseEntity);
  }

  async getAll(): Promise<CreatedCourseDto[]> {
    try {
      const courses = await this.courseRepository.find();
      return courses.map((course) => new CreatedCourseDto(course));
    } catch (error) {
      throw new HttpException('Houve um erro ao listar os cursos!', HttpStatus.BAD_REQUEST,);
    }
  }

  async create({ name }: CreateCourseDto): Promise<CreatedCourseDto> {
    try {
      const createCourse = this.courseRepository.create({name});
      const savedCourse = await this.courseRepository.save(createCourse);
      return new CreatedCourseDto(savedCourse);
    } catch (error) {
      throw new HttpException('Houve um erro ao adicionar o curso!', HttpStatus.BAD_REQUEST);
    }
  }
}