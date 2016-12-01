/**
 * Created by Derek on 29/11/16.
 */
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server')

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count:${count}`);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    // db.collection('Todos').find({_id: new ObjectID("583d2568007cfb2f3ced8857")}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });


    db.close();
});