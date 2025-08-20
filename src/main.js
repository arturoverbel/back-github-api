import express from 'express';
import config from './config.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend Works!');
});

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});