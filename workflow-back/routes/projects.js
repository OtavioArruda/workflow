const express = require('express');
const expressJwt = require('express-jwt');

const Project = require('../db/models/project');

const router = express.Router();

const jwtMiddleware = expressJwt.expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.get('/', jwtMiddleware, async (req, res) => {
    const projects = await Project.find().exec();

    res.json(projects);
});

router.post('/', jwtMiddleware, async (req, res) => {
    try {
        const project = req.body;

        project.user_id = req.auth.userId;

        await Project.create(project);

        res.status(201).send('Project created successful');
    }
    catch(e) {
        console.log(e);

        res.status(500).send(`Project creation error, code: ${ e.code }`);
    }
});

// router.get('/', jwtMiddleware, (req, res) => {
//     Project.find().exec().then(x => res.send(x));
// });

module.exports = router;