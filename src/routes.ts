import {Router, Request, Response, NextFunction} from 'express';
import { CategoryController } from './controllers/category.controller';
import { CourseController } from './controllers/course.controller';
import { CategoryService } from './services/category.service';
import { AppDataSource } from './config/data-source';
import { CourseService } from './services/course.service';

const routes = Router();

const categoryController = new CategoryController(
  new CategoryService(AppDataSource)
);

const courseControler = new CourseController(
  new CourseService(AppDataSource)
);

routes.get('/', (request: Request, response: Response) => {
    return response.json({ status: 'success', version: '1.0.0'}).status(200)
  });
  
routes.get('/categories', (request: Request, response: Response, next: NextFunction) => {
    categoryController.getAll(request, response).catch((error: Error) =>{
      next(error);
    })
  });
  
  //Rota POST - para criar um novo recurso no Categories
routes.post('/categories', (request: Request, response: Response,next: NextFunction) => {
    categoryController.create(request, response).catch((error: Error) =>{
      next(error);
    })
  });
  
  //Rota GET por ID (SHOW) pegar uma Categoria por ID
routes.get('/categories/:id', (request: Request, response: Response,next: NextFunction) => {
  categoryController.show(request, response).catch((error: Error) =>{
    next(error);
  })
});
  
  //Rota PUT por ID (update) alterar categoria pr ID
routes.put('/categories/:id', (request: Request, response: Response,next: NextFunction) => {
  categoryController.update(request, response).catch((error: Error) =>{
    next(error);
  })
});

  
  //Rota DELETE por ID (delete) excluir uma categoria por ID
routes.delete('/categories/:id', (request: Request, response: Response,next: NextFunction) => {
  categoryController.delete(request, response).catch((error: Error) =>{
    next(error);
  })
});



//Rota GET all Courses
routes.get('/courses', (request: Request, response: Response, next: NextFunction) => {
  courseControler.getAll(request, response).catch((error: Error) =>{
    next(error);
  })
});

//Rota POST - para criar um novo recurso no Courses
routes.post('/courses', (request: Request, response: Response,next: NextFunction) => {
  courseControler.create(request, response).catch((error: Error) =>{
    next(error);
  })
});


//Rota GET por ID (SHOW) pegar um Curso por ID
routes.get('/courses/:id', (request: Request, response: Response,next: NextFunction) => {
  courseControler.show(request, response).catch((error: Error) =>{
    next(error);
  })
});


 //Rota PUT por ID (update) alterar Curso pr ID
routes.put('/courses/:id', (request: Request, response: Response,next: NextFunction) => {
  courseControler.update(request, response).catch((error: Error) =>{
    next(error);
  }) 
});

//Rota DELETE por ID (delete) excluir um curso por ID
routes.delete('/courses/:id', (request: Request, response: Response,next: NextFunction) => {
  courseControler.delete(request, response).catch((error: Error) =>{
    next(error);
  })
});

  export{routes};