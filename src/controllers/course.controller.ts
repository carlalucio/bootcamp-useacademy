import {Request, Response} from 'express';
import { CreateCourseDto } from '../dtos/course/create-course.dto';
import { CreatedCourseDto } from '../dtos/course/created-course.dto';
import { CourseService } from '../services/course.service';
import { HttpStatus } from '../utils/enums/http-status.enum';


interface CreateCourseBody extends Request {
    body: CreateCourseDto;
}
export class CourseController {
    constructor(private readonly courseService: CourseService){}

    async getAll(request: Request, response: Response){
        const courses = await this.courseService.getAll();
        return response.status(HttpStatus.OK).json(courses);
    }
    
    async create({ body: {name, description,value, image, disponibility, category_id }}: CreateCourseBody, response: Response):Promise<Response<CreatedCourseDto>> {
        const createdCourse = await this.courseService.create({name, description,value, image, disponibility, category_id});
        return response.status(HttpStatus.CREATED).json(createdCourse);
    }
    
    async show(request: Request, response: Response): Promise<Response<CreatedCourseDto>> {
        const { id } = request.params;
        const course = await this.courseService.show(id);
        return response.status(HttpStatus.OK).json(course);
      }
    
      async update(request: Request, response: Response) :Promise<Response<CreatedCourseDto>>  
      {
        const { id } = request.params;
        const {name, description,value, image, disponibility, category_id} = request.body;
        const course = await this.courseService.update(id, name, description, value, image, disponibility, category_id);
        return response.status(HttpStatus.NO_CONTENT).json(course);
      }
    
      async delete(request: Request, response: Response): Promise<Response<CreatedCourseDto>> {
        const { id } = request.params;
        const course = await this.courseService.delete(id);
        return response.status(HttpStatus.NO_CONTENT).json(course);
      }
    }

   
