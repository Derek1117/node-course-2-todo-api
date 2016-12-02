"use strict";
/**
 * Created by derek1117 on 1/12/16.
 */
const express = require('express');
const bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
const todo_1 = require('./models/todo');
const mongodb_1 = require('mongodb');
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
app.get('/todos', (req, res) => {
    todo_1.Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});
app.get('/todos/:id', (req, res) => {
    // res.send(req.params);
    var id = req.params.id;
    if (!mongodb_1.ObjectID.isValid(id)) {
        return res.status(404).send('Invalid Id');
    }
    todo_1.Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
            return;
        }
        res.send({ todo });
    }, (e) => {
        res.status(400).send();
    });
});
app.listen(3000, () => {
    console.log('Started on port 3000');
});
//# sourceMappingURL=server.js.map