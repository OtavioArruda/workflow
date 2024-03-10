require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const User = require('../db/models/user');

const router = express.Router();

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).exec();

    if(await argon2.verify(user.password, req.body.password)) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        res.json({ token });
    }
    else {
        res.status(401).send('Unautorized');
    }
});

module.exports = router;