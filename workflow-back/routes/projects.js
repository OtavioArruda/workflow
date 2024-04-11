const express = require('express');
const expressJwt = require('express-jwt');

const Project = require('../db/models/project');

const router = express.Router();

const jwtMiddleware = expressJwt.expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.get('/', jwtMiddleware, async (req, res) => {
    const projects = await Project
        .find({ user: req.auth.userId })
        .populate({
            path: 'folders',
            populate: {
                path: 'columns',
                populate: {
                    path: 'tasks'
                }
            }
        })
        .exec();

    res.json(projects);
});

router.post('/', jwtMiddleware, async (req, res) => {
    try {
        const projectBody = req.body;

        projectBody.user = req.auth.userId;

        const ret = await Project.create(projectBody);

        console.log(ret._id);

        res.status(201).send('Project created successful');
    }
    catch(e) {
        console.log(e);

        res.status(500).send(`Project creation error, code: ${ e.code }`);
    }
});

router.put('/:projectId', jwtMiddleware, async (req, res) => {
    try {
        const projectBody = req.body;

        await Project.findByIdAndUpdate(req.params.projectId, projectBody);

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