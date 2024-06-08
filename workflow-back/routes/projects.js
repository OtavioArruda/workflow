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

    res.json({
        data: {
            projects
        }
    });
});

router.get('/all', async (req, res) => {
    try {
        const projects = await Project.find().populate({
            path: 'folders',
            populate: {
                path: 'columns',
                populate: {
                    path: 'tasks'
                }
            }
        }).exec();
        
        res.json({
            data: {
                projects
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', jwtMiddleware, async (req, res) => {
    try {
        const projectBody = req.body;

        projectBody.user = req.auth.userId;

        const project = await Project.create(projectBody);

        res.status(201).json({
            data: {
                project,
                message: 'Project created successful'
            }
        });
    }
    catch(e) {
        console.log(e);

        res.status(500).json({
            error: {
                message: `Project creation error, code: ${ e.code }` 
            }
        });
    }
});

router.put('/:projectId', jwtMiddleware, async (req, res) => {
    try {
        const projectBody = req.body;

        const project = await Project.findByIdAndUpdate(req.params.projectId, projectBody, { new: true });

        res.status(200).json({
            data: {
                project,
                message: 'Project updated successful'
            }
        });
    }
    catch(e) {
        console.log(e);

        res.status(500).json({
            error: {
                message: `Project updating error, code: ${ e.code }`
            }
        });
    }
});

router.delete('/:projectId', jwtMiddleware, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.projectId);

        res.status(200).json({
            data: {
                project: {
                    _id: req.params.projectId
                },
                message: 'Project deleted successful'
            }
        });
    }
    catch(e) {
        console.log(e);

        res.status(500).json({
            error: {
                message: `Project deletation error, code: ${ e.code }`
            }
        });
    }
});

module.exports = router;