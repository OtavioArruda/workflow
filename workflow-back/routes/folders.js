const express = require('express');
const expressJwt = require('express-jwt');

const Folder = require('../db/models/folder');
const Project = require('../db/models/project');

const router = express.Router();

const jwtMiddleware = expressJwt.expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.post('/', jwtMiddleware, async (req, res) => {
    try {
        const folderBody = req.body;

        const folder = await Folder.create(folderBody);

        const project = await Project.findById(folderBody.projectId);

        project.folders.push(folder._id);

        project.save();

        res.status(201).send('Folder created successful');
    }
    catch(e) {
        console.log(e);

        res.status(500).send(`Folder creation error, code: ${ e.code }`);
    }
});

router.put('/:folderId', jwtMiddleware, async (req, res) => {
    try {
        const folderBody = req.body;

        await Folder.findByIdAndUpdate(req.params.folderId, folderBody);

        res.status(200).send('Folder updated successful');
    }
    catch(e) {
        console.log(e);

        res.status(500).send(`Folder updating error, code: ${ e.code }`);
    }
});

router.delete('/:folderId', jwtMiddleware, async (req, res) => {
    try {
        await Folder.findByIdAndDelete(req.params.folderId);

        const project = await Project.findOne({ folders: req.params.folderId }).exec();

        project.folders.splice(project.folders.indexOf(req.params.folderId), 1);

        project.save();

        res.status(200).send('Folder deleted successful');
    }
    catch(e) {
        console.log(e);

        res.status(500).send(`Folder deletation error, code: ${ e.code }`);
    }
});

module.exports = router;