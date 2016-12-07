"use strict";
/**
 * Created by derek1117 on 2/12/16.
 */
const request = require("supertest");
const expect = require("expect");
const mongodb_1 = require("mongodb");
const server_1 = require("./../server");
const todo_1 = require("./../models/todo");
const user_1 = require("./../models/user");
const { todos, populateTodos, populateUsers, users } = require('./seed/seed');
beforeEach(populateUsers);
beforeEach(populateTodos);
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
describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'This should be the new text';
        request(server_1.app)
            .patch(`/todos/${hexId}`)
            .send({
            completed: true,
            text
        })
            .expect(200)
            .expect((res) => {
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completedAt).toBeA('number');
        })
            .end(done);
    });
    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'This should be the new text';
        request(server_1.app)
            .patch(`/todos/${hexId}`)
            .send({
            completed: false,
            text
        })
            .expect(200)
            .expect((res) => {
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completedAt).toNotExist();
        })
            .end(done);
    });
});
describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(server_1.app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
            .end(done);
    });
    it('should return 401 if not authenticated', (done) => {
        request(server_1.app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
            expect(res.body).toEqual({});
        })
            .end(done);
    });
});
describe('POST /users', () => {
    it('should create a user', (done) => {
        var email = 'asdasd@asdas.com';
        var password = 'asda123';
        request(server_1.app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
            expect(res.headers['x-auth']).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);
        })
            .end((err) => {
            if (err) {
                return done(err);
            }
            user_1.User.findOne({ email }).then((user) => {
                expect(user).toExist();
                expect(user.password).toNotBe(password);
                done();
            });
        });
    });
    it('should return validation erros if request invalid', (done) => {
        var email = 'a';
        var password = 's';
        request(server_1.app)
            .post('/users')
            .send({ email, password })
            .expect(400)
            .end(done);
    });
    it('should not create a user if email in use', (done) => {
        request(server_1.app)
            .post('/users')
            .send({
            email: users[0].email,
            password: users[0].password
        })
            .expect(400)
            .end(done);
    });
});
//# sourceMappingURL=server.test.js.map