/**
 * Created by derek1117 on 1/12/16.
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';

var {mongoose} = require('./db/mongoose');
import {Todo} from'./models/todo';
import {User} from'./models/user';

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
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

export {app};