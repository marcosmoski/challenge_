import express from 'express'
import { router } from './routes';
import * as swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json';


const app = express();

app.use(express.json())
app.use(router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export { app } // namedexport  facilita no auto import do vs code;