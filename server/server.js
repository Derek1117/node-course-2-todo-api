"use strict";
/**
 * Created by derek1117 on 1/12/16.
 */
require('./../server/config/config');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require("lodash");
var { mongoose } = require('./db/mongoose');
const todo_1 = require('./models/todo');
const mongodb_1 = require('mongodb');
var app = express();
exports.app = app;
const port = process.env.PORT;
app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    var todo = new todo_1.Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }).catch((e) => {
        return res.status(400).send();
    });
});
app.get('/todos', (req, res) => {
    todo_1.Todo.find().then((todos) => {
        res.send({ todos });
    }).catch((e) => {
        return res.status(400).send();
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
        }
        res.send({ todo });
    }).catch((e) => {
        return res.status(400).send();
    });
});
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!mongodb_1.ObjectID.isValid(id)) {
        return res.status(404).send('Invalid Id');
    }
    todo_1.Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        return res.status(400).send();
    });
});
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!mongodb_1.ObjectID.isValid(id)) {
        return res.status(404).send('Invalid Id');
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }
    todo_1.Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
//# sourceMappingURL=server.js.map