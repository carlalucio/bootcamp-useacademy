import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());
const categories: any = [];
const courses: any = [];

//Rota GET para status do servidor
app.get('/', (request: Request, response: Response) => {
  return response.json({ status: 'success', version: '1.0.0'}).status(200)
});

//Rota GET all categories
app.get('/categories', (request: Request, response: Response) => {
  return response.json(categories).status(200)
});

//Rota POST - para criar um novo recurso no Categories
app.post('/categories', (request: Request, response: Response) => {
  const data = request.body;
  const category = {
  id: (categories.length + 1) ,
  name: data.name,
  created_at: new Date(),
  update_at: new Date(),
  }
  categories.push(category);
  return response.json().status(200)
});

//Rota GET por ID (SHOW) pegar uma Categoria por ID
app.get('/categories/:id', (request: Request, response: Response) => {
  const {id} = request.params;
  const category = categories.find((item: any) => item.id ==id)

  return response.json(category).status(200)
});

//Rota GET all Courses
app.get('/courses', (request: Request, response: Response) => {
  return response.json(courses).status(200)
})

//Rota POST - para criar um novo recurso no Courses
app.post('/courses', (request: Request, response: Response) => {
  const data = request.body;
  const course = {
  id: (courses.length + 1),
  name: data.name,
  description: data.description,
  value: data.value,
  image: data.image,
  disponibility: data.disponibility,
  category_id:data.category_id,
  created_at: new Date(),
  update_at: new Date(),
  }
  courses.push(course);
  return response.json().status(200)
});


//Rota GET por ID (SHOW) pegar um Curso por ID
app.get('/courses/:id', (request: Request, response: Response) => {
  const {id} = request.params;
  const course = courses.find((item: any) => item.id ==id)
  return response.json(course).status(200)
});


//Cria uma porta e callback
app.listen(3000, () => {
   console.log('Server in running');
});

