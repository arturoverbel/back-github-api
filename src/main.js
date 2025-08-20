import express from 'express';
import config from './config.js';
import GithubService from './service/github.service.js';
import { connectToDatabase } from './utils/database.js';
import { User } from './model/user.model.js';
import { authMiddleware, generateToken } from './utils/jwt.js';

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


app.post('/register', async (req, res) => {
    const user = req.body

    const result = await User.create(user)
    console.log({result})
    const access_token = generateToken(result)

    res.send({status: 'success', access_token})
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email, password})
    if(!user) return res.status(400).send({status: 'error', error: 'Invalid credentials'})

    const access_token = generateToken(user)

    res.send({status: 'success', access_token})
})

app.get('/private', authMiddleware, (req, res) => {
    res.send({status: 'success', payload: req.user})

})



connectToDatabase().then(() => {
    app.listen(config.port, () => {
        console.log(`Server is running on http://localhost:${config.port}`);
    });
}).catch((error) => {
    console.error('Database connection failed:', error);
});
