import express from 'express';
import usersRouter from './routes/users.routes.js';
import swaggerUI from 'swagger-ui-express';
import { readFile } from 'fs/promises';
const swaggerDocument = JSON.parse(await readFile(new URL('./swagger.json', import.meta.url)));

const router = express.Router();

//Swagger documentation
router.use("/docs", swaggerUI.serve, (req, res)=> {
    let html = swaggerUI.generateHTML(swaggerDocument);
    res.send(html);
});

router.use('/users', usersRouter);


export default router;
