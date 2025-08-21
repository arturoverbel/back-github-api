import { authMiddleware, generateToken } from '../utils/jwt.js';
import { User } from '../model/user.model.js';
import { Router } from "express";
import { createHash, isValidPassword } from '../utils/hash.js';

const router = Router();

/**
 * @swagger
 * /session/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 access_token:
 *                   type: string
 *                   description: Access token for the user
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: User already exists
 */
router.post('/register', async (req, res) => {
    const user = req.body

    const found = await User.findOne({where: {email: user.email}})
    if(found)
        return res.status(400).send({
            status: 'error',
            error: 'User already exists'
        })

    user.password = createHash(user.password)

    const result = await User.create(user)
    console.log({result})
    const access_token = generateToken(result)

    res.send({status: 'success', access_token})
})

/**
 * @swagger
 * /session/login:
 *   post:
 *     summary: Login an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 access_token:
 *                   type: string
 *                   description: Access token for the user
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: Invalid credentials
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email})
    if(!user) return res.status(400).send({status: 'error', error: 'Invalid credentials'})

    if(!isValidPassword(user, password)) {
        return res.status(400).send({status: 'error', error: 'Invalid credentials'})
    }

    const access_token = generateToken(user)

    res.send({status: 'success', access_token})
})

/**
 * @swagger
 * /session/private:
 *   get:
 *     summary: Get private data (protected route)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Private data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: object
 *                   description: User data
 *       401:
 *         description: Unauthorized
 */
router.get('/private', authMiddleware, (req, res) => {
    res.send({status: 'success', payload: req.user})

})

export default router;