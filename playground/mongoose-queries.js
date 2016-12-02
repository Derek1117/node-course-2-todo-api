/**
 * Created by derek1117 on 2/12/16.
 */
"use strict";
const { mongoose } = require("./../server/db/mongoose");
const user_1 = require("./../server/models/user");
// var id = '58411204745c2a44e9e9da74';
//
// if (!ObjectID.isValid(id)) {
//     console.log('Id not valid');
// }
//
// Todo.find({
//     _id: id
// }).then((todos) => {
//    console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => {
//     console.log(e);
// });
var id = "583ff66792792399f1917147";
user_1.User.findById(id).then((user) => {
    if (!user) {
        return console.log('User not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
    console.log(e);
});
//# sourceMappingURL=mongoose-queries.js.map