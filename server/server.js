"use strict";
/**
 * Created by derek1117 on 1/12/16.
 */
const express = require('express');
const bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
const todo_1 = require('./models/todo');
var app = express();
exports.app = app;
app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    var todo = new todo_1.Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});
app.listen(3000, () => {
    console.log('Started on port 3000');
});
//# sourceMappingURL=server.js.map