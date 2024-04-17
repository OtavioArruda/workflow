const express = require('express');
const argon2 = require('argon2');
const expressJwt = require('express-jwt');

const User = require('../db/models/user');

const router = express.Router();

const jwtMiddleware = expressJwt.expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.get('/', async (req, res) => {
    const users = await User.find().exec();

    res.json(users);
});

router.get('/me', jwtMiddleware, async (req, res) => {
    const user = await User.findById(req.auth.userId).exec();

    res.json(user);
});

router.post('/', async (req, res) => {
    try {
        const userBody = req.body;

        userBody.password = await argon2.hash(userBody.password);

        await User.create(userBody);

        res.status(201).send('User created successful');
    }
    catch(e) {
        console.log(e);

        res.status(500).send(`User creation error, code: ${ e.code }`);
    }
});

module.exports = router;
