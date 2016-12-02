/**
 * Created by derek1117 on 1/12/16.
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';

var {mongoose} = require('./db/mongoose');
import {Todo} from'./models/todo';
import {User} from'./models/user';
import {ObjectID} from 'mongodb';

var app = express();
const port = process.env.PORT || 3000;

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


app.listen(port, () => {
    console.log(`Started on port ${port}` );
});

export {app};