const express = require('express');
const argon2 = require('argon2');
const expressJwt = require('express-jwt');

const User = require('../db/models/user');

const router = express.Router();

const jwtMiddleware = expressJwt.expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.get('/', (req, res) => {
    User.find().exec().then(x => res.json(x));
});

router.get('/me', jwtMiddleware, (req, res) => {
    User.findById(req.auth.userId).exec().then(x => res.json(x));
});

router.post('/', async (req, res) => {
    try {
        const user = req.body;

        user.password = await argon2.hash(user.password);

        await User.create(user);

        res.status(201).send('User created successful');
    }
    catch(e) {
        console.log(e);

        res.status(500).send(`User creation error, code: ${ e.code }`);
    }
});

module.exports = router;
