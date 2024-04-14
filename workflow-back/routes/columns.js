const express = require('express');
const expressJwt = require('express-jwt');

const Column = require('../db/models/column');
const Folder = require('../db/models/folder');

const router = express.Router();

const jwtMiddleware = expressJwt.expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.post('/', jwtMiddleware, async (req, res) => {
    try {
        const columnBody = req.body;

        const column = await Column.create(columnBody);

        const folder = await Folder.findById(columnBody.folderId);

        folder.columns.push(column._id);

        folder.save();

        res.status(201).send('Column created successful');
    }
    catch(e) {
        console.log(e);

        res.status(500).send(`Column creation error, code: ${ e.code }`);
    }
});

router.put('/:columnId', jwtMiddleware, async (req, res) => {
    try {
        const columnBody = req.body;

        await Column.findByIdAndUpdate(req.params.columnId, columnBody);

        res.status(200).send('Column updated successful');
    }
    catch(e) {
        console.log(e);

        res.status(500).send(`Column updating error, code: ${ e.code }`);
    }
});

router.delete('/:columnId', jwtMiddleware, async (req, res) => {
    try {
        await Column.findByIdAndDelete(req.params.columnId);

        const folder = await Folder.findOne({ columns: req.params.columnId }).exec();

        folder.columns.splice(folder.columns.indexOf(req.params.columnId), 1);

        folder.save();

        res.status(200).send('Column deleted successful');
    }
    catch(e) {
        console.log(e);

        res.status(500).send(`Column deletation error, code: ${ e.code }`);
    }
});

module.exports = router;