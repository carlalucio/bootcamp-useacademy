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

  async create({ name, description, value, image, disponibility, category_id  }: CreateCourseDto): Promise<CreatedCourseDto> {
    try {
      const createCourse = this.courseRepository.create({name, description, value, image, disponibility, category_id});
      const savedCourse = await this.courseRepository.save(createCourse);
      return new CreatedCourseDto(savedCourse);
    } catch (error) {
      throw new HttpException('Houve um erro ao adicionar o curso!', HttpStatus.BAD_REQUEST);
    }
  }

  async show(id:string): Promise<any>{
    const course = await this.courseRepository.findOne({where:{id}});
    if (course) return new CreatedCourseDto(course);
    else return new HttpException('Houve um erro ao listar o curso', HttpStatus.BAD_REQUEST)
  }

  async update( id: string, name: string, description: string,value: number, image: string, disponibility: boolean, category_id: string ): Promise<any>{
    try{
      await this.courseRepository.update(id, {name, description, value, image, disponibility, category_id})
      return this.courseRepository.findOne({where:{id}});
    } catch (error) {
      throw new HttpException('Houve um erro ao atualizar curso!', HttpStatus.BAD_REQUEST);
    }
  
}
  async delete(id:string): Promise<CreatedCourseDto>{
    try {
      const course = await this.courseRepository.findOne({where:{id}});
      if(course)
      await this.courseRepository.delete(id);
      return new CourseEntity();
    } catch (error) {
      throw new HttpException('Houve um erro ao excluir curso!', HttpStatus.BAD_REQUEST);
    }
  }
}