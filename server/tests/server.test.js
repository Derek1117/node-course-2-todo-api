"use strict";
/**
 * Created by derek1117 on 2/12/16.
 */
const request = require("supertest");
const expect = require("expect");
const mongodb_1 = require("mongodb");
const server_1 = require("./../server");
const todo_1 = require("./../models/todo");
const todos = [{
        _id: new mongodb_1.ObjectID(),
        text: 'First test todo'
    }, {
        _id: new mongodb_1.ObjectID(),
        text: 'Second test todo'
    }];
beforeEach((done) => {
    todo_1.Todo.remove({}).then(() => {
        todo_1.Todo.insertMany(todos);
    }).then(() => done());
});
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        request(server_1.app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
            expect(res.body.text).toBe(text);
        })
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            todo_1.Todo.find({ text }).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });
    it('should not create todo with invalid body data', (done) => {
        request(server_1.app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            todo_1.Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});
describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(server_1.app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
            .end(done);
    });
});
describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(server_1.app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
            .end(done);
    });
    it('should retrun 404 if todo not found', (done) => {
        let _id = new mongodb_1.ObjectID();
        request(server_1.app)
            .get(`/todos/${_id.toHexString()}`)
            .expect(404)
            .end(done);
    });
    it('should retrun 404 for non-object ids', (done) => {
        request(server_1.app)
            .get(`/todos/aaa`)
            .expect(404)
            .end(done);
    });
});
describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(server_1.app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            todo_1.Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((e) => done(e));
        });
    });
    it('should retrun 404 if todo not found', (done) => {
        let id = new mongodb_1.ObjectID().toHexString();
        request(server_1.app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
    it('should retrun 404 for non-object ids', (done) => {
        request(server_1.app)
            .delete(`/todos/aaa`)
            .expect(404)
            .end(done);
    });
});
//# sourceMappingURL=server.test.js.map