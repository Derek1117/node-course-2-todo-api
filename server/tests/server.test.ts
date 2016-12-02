/**
 * Created by derek1117 on 2/12/16.
 */
import * as request from "supertest";
import * as expect from "expect";

import { app } from "./../server";
import { Todo } from "./../models/todo";
import { User } from "./../models/user";

const todos = [{
    text: 'First test todo'
}, {
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