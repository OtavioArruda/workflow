const express = require('express');
const expressJwt = require('express-jwt');

const Task = require('../db/models/task');
const Column = require('../db/models/column');

const router = express.Router();

const jwtMiddleware = expressJwt.expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.post('/', jwtMiddleware, async (req, res) => {
    try {
        const taskBody = req.body;

        const task = await Task.create(taskBody);

        const column = await Column.findById(taskBody.columnId);

        column.tasks.push(task._id);

        column.save();

        res.status(201).json({
            data: {
                task,
                message: 'Task created successful'
            }
        });
    }
    catch(e) {
        console.log(e);

        res.status(500).json({
            error: {
                message: `Task creation error, code: ${ e.code }`
            }
        });
    }
});

router.put('/:taskId', jwtMiddleware, async (req, res) => {
    try {
        const taskBody = req.body;

        const task = await Task.findByIdAndUpdate(req.params.taskId, taskBody, { new: true });

        res.status(200).json({
            data: {
                task,
                message: 'Task updated successful'
            }
        });
    }
    catch(e) {
        console.log(e);

        res.status(500).json({
            error: {
                message: `Task updating error, code: ${ e.code }`
            }
        });
    }
});

router.delete('/:taskId', jwtMiddleware, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.taskId);

        const column = await Column.findOne({ tasks: req.params.taskId }).exec();

        column.tasks.splice(column.tasks.indexOf(req.params.taskId), 1);

        column.save();

        res.status(200).json({
            data: {
                task: {
                    _id: req.params.taskId
                },
                message: 'Task deleted successful'
            }
        });
    }
    catch(e) {
        console.log(e);

        res.status(500).json({
            error: {
                message: `Task deletation error, code: ${ e.code }`
            }
        });
    }
});

module.exports = router;