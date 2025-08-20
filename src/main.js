import express from 'express';
import config from './config.js';
import GithubService from './service/github.service.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend Works!');
});

app.get('/user/:username', async (req, res) => {
    const username = req.params.username;
    const githubService = new GithubService();

    try {
        const data = await Promise.all([
            await githubService.getUser(username),
            await githubService.getRepos(username)
        ]);

        const userData = data[0];
        userData.repos = data[1];

        res.json(userData);
    } catch (error) {
        return res.status(error.status).json({ error: error.message });
    }
});


app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});