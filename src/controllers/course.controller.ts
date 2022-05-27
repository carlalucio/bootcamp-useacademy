import {Request, Response} from 'express';
import { CreateCourseDto } from '../dtos/course/create-course.dto';
import { CreatedCourseDto } from '../dtos/course/created-course.dto';
import { CourseService } from '../services/course.service';
import { HttpStatus } from '../utils/enums/http-status.enum'

let courses: Array<ICourse> = [];

interface ICourse {
    id?: string,
    name: string,
    description: string,
    value: number,
    image: string,
    disponibility: boolean,
    category_id:string,
    created_at: Date,
    updated_at: Date,
  }

interface CreateCourseBody extends Request {
    body: CreateCourseDto;
  }

export class CourseController {
    constructor(private readonly courseService: CourseService){}

    async getAll(request: Request, response: Response){
        const courses = await this.courseService.getAll();
        return response.status(HttpStatus.OK).json(courses);
    }
    
    async create({ body: {name} }: CreateCourseBody, response: Response):Promise<Response<CreatedCourseDto>> {
        const createdCourse = await this.courseService.create({name});
        return response.status(HttpStatus.CREATED).json(createdCourse);
    }
    



    async show(request: Request, response: Response){
        const {id} = request.params;
        const course = courses.find((course : ICourse) => course.id ==id)
        return response.status(HttpStatus.OK).json(course)
        
    }

   

    async update(request: Request, response: Response){
        const {id} = request.params;
        const data = request.body;
         courses = courses.map((course: ICourse) => {
            if (course.id==id) {
            course = {...course, name: data.name, updated_at: new Date()}
            }
            return course
        })
    return response.status(HttpStatus.NO_CONTENT).json()
    }

    async delete(request: Request, response: Response){
        const {id} = request.params;
        courses.forEach ((course: ICourse, index: number) => {
            if (course.id==id) courses.splice(index, 1) 
         })
        return response.status(HttpStatus.NO_CONTENT).json()
    }
}