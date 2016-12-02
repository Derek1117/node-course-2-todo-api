/**
 * Created by derek1117 on 1/12/16.
 */
require('./../server/config/config');

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as _ from "lodash";

var {mongoose} = require('./db/mongoose');
import {Todo} from'./models/todo';
import {User} from'./models/user';
import {ObjectID} from 'mongodb';

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
       res.send(doc);
    }).catch((e) => {
        return res.status(400).send();
    });


});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch((e) => {
        return res.status(400).send();
    });

});

app.get('/todos/:id', (req, res) => {
   // res.send(req.params);
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
       return res.status(404).send('Invalid Id')
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        return res.status(400).send();
    });


});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid Id')
    }

    Todo.findByIdAndRemove(id).then((todo) => {
            if (!todo) {
                res.status(404).send();
            }

            res.send({todo});
    }).catch((e) => {
        return res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body: any = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid Id')
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
})


app.listen(port, () => {
    console.log(`Started on port ${port}` );
});

export {app};