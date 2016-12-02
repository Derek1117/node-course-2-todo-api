/**
 * Created by derek1117 on 2/12/16.
 */
import * as request from "supertest";
import * as expect from "expect";

import {ObjectID} from "mongodb";

import { app } from "./../server";
import { Todo } from "./../models/todo";



const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}]

beforeEach((done) => {
   Todo.remove({}).then(() => {
       Todo.insertMany(todos);
   }).then(() => done());
});

describe('POST /todos', () => {
   it('should create a new todo', (done) => {
       var text = 'Test todo text';

       request(app)
           .post('/todos')
           .send({text})
           .expect(200)
           .expect((res) => {
            expect(res.body.text).toBe(text);
           })
           .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find({text}).then((todos: any) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
           });
   });

   it('should not create todo with invalid body data', (done) => {
       request(app)
           .post('/todos')
           .send({})
           .expect(400)
           .end((err, res) => {
               if (err) {
                   return done(err);
               }

               Todo.find().then((todos: any) => {
                   expect(todos.length).toBe(2);
                   done();
               }).catch((e) => done(e));
           });
   });
});

describe('GET /todos', () => {
   it('should get all todos', (done) => {
       request(app)
           .get('/todos')
           .expect(200)
           .expect((res) => {
            expect(res.body.todos.length).toBe(2);
           })
           .end(done);
   }) ;
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    }) ;

    it('should retrun 404 if todo not found', (done) => {

        let _id = new ObjectID();

        request(app)
            .get(`/todos/${_id.toHexString()}`)
            .expect(404)
            .end(done);
    }) ;

    it('should retrun 404 for non-object ids', (done) => {
        request(app)
            .get(`/todos/aaa`)
            .expect(404)
            .end(done);
    }) ;
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {

        var hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    }) ;

    it('should retrun 404 if todo not found', (done) => {

        let id = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    }) ;

    it('should retrun 404 for non-object ids', (done) => {
        request(app)
            .delete(`/todos/aaa`)
            .expect(404)
            .end(done);
    }) ;
});