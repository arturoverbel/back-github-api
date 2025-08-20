import express from 'express';
import config from './config.js';
import { connectToDatabase } from './utils/database.js';
import apiRouter from './router/api.router.js';
import sessionRouter from './router/session.router.js';
import { authMiddleware } from './utils/jwt.js';

const app = express();

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
