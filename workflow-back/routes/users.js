const express = require('express');
const argon2 = require('argon2');
const expressJwt = require('express-jwt');

const User = require('../db/models/user');

const router = express.Router();

const jwtMiddleware = expressJwt.expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.get('/', async (req, res) => {
    const users = await User.find().exec();

    res.json({
        data: users
    });
});

router.get('/me', jwtMiddleware, async (req, res) => {
    const user = await User.findById(req.auth.userId).exec();

    res.json({
        data: {
            user
        }
    });
});

router.post('/', async (req, res) => {
    try {
        const userBody = req.body;

        userBody.password = await argon2.hash(userBody.password);

        const user = await User.create(userBody);

        res.status(201).json({
            data: {
                user,
                message: 'User created successful'
            } 
        });
    }
    catch(e) {
        console.log(e);

        res.status(500).json({
            error: {
                message: `User creation error, code: ${ e.code }`
            }
        });
    }
});

router.put('/', jwtMiddleware, async (req, res) => {
    try {
        const userBody = req.body;
    
        const user = await Project.findByIdAndUpdate(req.auth.userId, userBody, { new: true });

        res.status(200).json({
            data: {
                user,
                message: 'User updated successful'
            }
        });
    }
    catch(e) {
        console.log(e);

        res.status(500).json({
            error: {
                message: `User updating error, code: ${ e.code }`
            }
        });
    }
});

module.exports = router;
