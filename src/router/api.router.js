import { Router } from "express";
import GithubService from '../service/github.service.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('Backend Works!');
});

router.get('/user/:username', async (req, res) => {
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

export default router;