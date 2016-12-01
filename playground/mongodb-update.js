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

    // db.collection('Todos').findOneAndUpdate({completed: false}, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({_id: new ObjectID('583d2f417c1c6734dadf94c6')},
        {
            $inc: {
                age: 1
            },
            $set: {
                name: 'QQ'
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
    });

    db.close();
});