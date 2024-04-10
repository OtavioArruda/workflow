const express = require('express');
const expressJwt = require('express-jwt');

const Project = require('../db/models/project');

const router = express.Router();

const jwtMiddleware = expressJwt.expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.get('/', jwtMiddleware, async (req, res) => {
    const projects = await Project.find({ user_id: req.auth.userId }).exec();

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

router.put('/:projectId', jwtMiddleware, async (req, res) => {
    try {
        const project = req.body;

        await Project.findByIdAndUpdate(req.params.projectId, project);

        res.status(200).send('Project updated successful');
    }
    catch(e) {
        console.log(e);

        res.status(500).send(`Project updating error, code: ${ e.code }`);
    }
});

router.delete('/:projectId', jwtMiddleware, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.projectId);

        res.status(200).send('Project deleted successful');
    }
    catch(e) {
        console.log(e);

        res.status(500).send(`Project deletation error, code: ${ e.code }`);
    }
});

module.exports = router;