import express from 'express';
import usersRouter from './routes/users.routes.js';

const router = express.Router();


router.use('/users', usersRouter);


export default router;
