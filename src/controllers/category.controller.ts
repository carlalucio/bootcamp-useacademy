import { Request, Response } from 'express';
import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { CreatedCategoryDto } from '../dtos/category/created-category.dto';
import { CategoryService } from '../services/category.service';
import { HttpStatus } from '../utils/enums/http-status.enum'
import { UpdateCategoryDto } from '../dtos/category/update-category.dto';


interface CreateCategoryBody extends Request {
  body: CreateCategoryDto;
}

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async getAll(request: Request, response: Response) {
    const categories = await this.categoryService.getAll();
    return response.status(HttpStatus.OK).json(categories);
  }

  async create({ body: { name } }: CreateCategoryBody, response: Response): Promise<Response<CreatedCategoryDto>> {
    const createdCategory = await this.categoryService.create({ name });
    return response.status(HttpStatus.CREATED).json(createdCategory);
  }

  async show(request: Request, response: Response): Promise<Response<CreatedCategoryDto>> {
    const { id } = request.params;
    const category = await this.categoryService.show(id);
    return response.status(HttpStatus.OK).json(category);
  }

  async update({body: category, params}: Request, response: Response) :Promise<Response<void>>  
  {
    await this.categoryService.update(params.id, category.name);
    return response.status(HttpStatus.NO_CONTENT).json(category);
  }

  async delete(request: Request, response: Response): Promise<Response<CreatedCategoryDto>> {
    const { id } = request.params;
    const category = await this.categoryService.delete(id);
    return response.status(HttpStatus.NO_CONTENT).json(category);
  }
}