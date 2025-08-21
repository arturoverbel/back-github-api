import cors from 'cors';
import express from 'express';

import { connectToDatabase } from './utils/database.js';
import sessionRouter from './router/session.router.js';
import { authMiddleware } from './utils/jwt.js';
import apiRouter from './router/api.router.js';
import config from './config.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from '../docs/swagger.js';

const app = express();
app.use(cors());

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check if the backend is running
 *     responses:
 *       200:
 *         description: Backend is running
 *       500:
 *         description: Internal server error
 */
app.get('/', (req, res) => {
	res.send('Backend Works!');
});
app.use('/api', authMiddleware, apiRouter);
app.use('/session', sessionRouter);

connectToDatabase().then(() => {
	app.listen(config.port, () => {
		console.log(`Server is running on PORT ${config.port}`);
	});
}).catch((error) => {
	console.error('Database connection failed:', error);
});
