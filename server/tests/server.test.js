"use strict";
/**
 * Created by derek1117 on 2/12/16.
 */
const request = require("supertest");
const expect = require("expect");
const server_1 = require("./../server");
const todo_1 = require("./../models/todo");
const todos = [{
        text: 'First test todo'
    }, {
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
//# sourceMappingURL=server.test.js.map