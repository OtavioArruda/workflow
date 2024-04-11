const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const projectsRouter = require('./routes/projects');
const foldersRouter = require('./routes/folders');
const columnsRouter = require('./routes/columns');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/folders', foldersRouter);
app.use('/columns', columnsRouter);

module.exports = app;
