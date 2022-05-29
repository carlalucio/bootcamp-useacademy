import express from 'express';
import { routes } from './routes';
import {env} from './config/environment-variables';
import { AppDataSource } from './config/data-source';
import { errorHandler } from './middlewares';

const PORT = env.PORT || 3000;
const app = express();
app.use(express.json());
//usar o arquivo de rotas
app.use(routes);
app.use(errorHandler);



//Cria uma porta e inicializar o banco de dados
AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => console.log(`Server in running in port ${PORT}`));
    })
    .catch((error) => console.log(error));



