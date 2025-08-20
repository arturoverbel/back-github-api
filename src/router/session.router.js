import { authMiddleware, generateToken } from '../utils/jwt.js';
import { User } from '../model/user.model.js';
import { Router } from "express";
import { createHash, isValidPassword } from '../utils/hash.js';

const router = Router();

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

router.get('/private', authMiddleware, (req, res) => {
    res.send({status: 'success', payload: req.user})

})

export default router;