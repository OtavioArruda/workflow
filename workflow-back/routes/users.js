const express = require('express');
const argon2 = require('argon2');

const User = require('../db/models/user');

const router = express.Router();


router.get('/', (req, res, next) => {
    User.find().exec().then(x => res.json(x));
});

router.post('/', async (req, res, next) => {
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
