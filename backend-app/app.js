const express = require('express');
const questionRouter = require('./resources/questions/questions.router');

const app = express();
app.use(express.json());

app.use('/questions', questionRouter);

module.exports = app;
