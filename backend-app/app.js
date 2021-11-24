const express = require('express');
const cors = require('cors');
const questionRouter = require('./resources/questions/questions.router');
const narrowThematicRouter = require('./resources/narrow-thematic/narrow-thematic.router');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/questions', questionRouter);
app.use('/narrow-thematic', narrowThematicRouter);

module.exports = app;
