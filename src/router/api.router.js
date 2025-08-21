import { Router } from "express";
import GithubService from '../service/github.service.js';

const router = Router();

/**
 * @swagger
 * /user/{username}:
 *   get:
 *     summary: Get user and repositories information
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the GitHub user
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 login:
 *                   type: string
 *                 id:
 *                   type: integer
 *                 node_id:
 *                   type: string
 *                 avatar_url:
 *                   type: string
 *                 repos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       full_name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       html_url:
 *                         type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
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