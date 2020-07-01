import 'reflect-metadata';
import 'dotenv/config';

import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';
import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';
import '@shared/container'

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(rateLimiter);

app.use(errors());

app.use((err: Error, request: Request, response: Response, next: NextFunction ) => {
	if(err instanceof AppError){
		return response.status(err.statusCode).json({
			status: err.statusCode,
			message: err.message,
		});
	}

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error',
	})
})

app.listen(3333, () => console.log('🚀 Server started on port 3333!'));
