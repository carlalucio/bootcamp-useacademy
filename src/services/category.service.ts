import { DataSource, Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { CreatedCategoryDto } from '../dtos/category/created-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { HttpException } from '../handler-exceptions/http-exception.provider';
import { HttpStatus } from '../utils/enums/http-status.enum';
import { body } from 'express-validator';


// interface ICategory {
//   id?: string,
//   name: string,
//   }


export class CategoryService {
  private categoryRepository: Repository<CategoryEntity>;

  constructor(private readonly connection: DataSource) {
    this.categoryRepository = this.connection.getRepository(CategoryEntity);
  }

  async getAll(): Promise<CreatedCategoryDto[]> {
    try {
      const categories = await this.categoryRepository.find();
      return categories.map((category) => new CreatedCategoryDto(category));
    } catch (error) {
      throw new HttpException('Houve um erro ao listar categorias!', HttpStatus.BAD_REQUEST,);
    }
  }

  async create({ name }: CreateCategoryDto): Promise<CreatedCategoryDto> {
    try {
      const createCategory = this.categoryRepository.create({ name });
      const savedCategory = await this.categoryRepository.save(createCategory);
      return new CreatedCategoryDto(savedCategory);
    } catch (error) {
      throw new HttpException('Houve um erro ao adicionar categoria!', HttpStatus.BAD_REQUEST);
    }
  }
   
  async show(id:string): Promise<CreatedCategoryDto>{
    const category = await this.categoryRepository.findOne({where:{id}});
    if (category)
    return new CreatedCategoryDto({id: category.id, name: category.name})
    else return new CategoryEntity(); 
  }

  
  // async update (id:string, name: string ): Promise<CreatedCategoryDto>{
  //   try {
  //     await this.categoryRepository.update(name,  );
    
  //     // await this.categoryRepository.preload({
  //     //   id:id,
  //     //   ...category})      
  //     return new CreatedCategoryDto (new CategoryEntity());
        
  //   }catch (error) {
  //     throw new HttpException('Houve um erro ao atualizar categoria!', HttpStatus.BAD_REQUEST);
  //   }
  // }
  
  
  async delete(id:string): Promise<CreatedCategoryDto>{
    try {
      const category = await this.categoryRepository.findOne({where:{id}});
      if(category)
      await this.categoryRepository.delete(id);
      return new CategoryEntity();
    } catch (error) {
      throw new HttpException('Houve um erro ao excluir categoria!', HttpStatus.BAD_REQUEST);
    }
  }
}