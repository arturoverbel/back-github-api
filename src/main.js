import cors from 'cors';
import express from 'express';

import { connectToDatabase } from './utils/database.js';
import sessionRouter from './router/session.router.js';
import { authMiddleware } from './utils/jwt.js';
import apiRouter from './router/api.router.js';
import config from './config.js';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
