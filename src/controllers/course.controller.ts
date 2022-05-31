import {Request, Response} from 'express';
import { CreatedCourseDto } from '../dtos/course/created-course.dto';
import { CourseService } from '../services/course.service';
import { HttpStatus } from '../utils/enums/http-status.enum';




export class CourseController {
    constructor(private readonly courseService: CourseService){}

    async getAll(request: Request, response: Response): Promise<Response<CreatedCourseDto[]>>{
        const courses = await this.courseService.getAll();
        return response.status(HttpStatus.OK).json(courses);
    }
    
    async create({body, file}: Request, response: Response):Promise<Response<CreatedCourseDto>> {
        const course = await this.courseService.create({...body,image:file?.filename});
        return response.status(HttpStatus.CREATED).json(course);
    }
    
    async show({params}: Request, response: Response): Promise<Response<CreatedCourseDto>> {
        const course = await this.courseService.show(params.id);
        return response.status(HttpStatus.OK).json(course);                                         
      }
    
    async update({body, file, params}: Request, response: Response) :Promise<Response<void>>{
      await this.courseService.update(params.id, {...body,image:file?.filename});
        return response.status(HttpStatus.NO_CONTENT).json();
      }
    
      async delete({params}: Request, response: Response): Promise<Response<void>> {
        await this.courseService.delete(params.id);
        return response.status(HttpStatus.NO_CONTENT).json();
      }
    }

   
