"use strict";
/**
 * Created by derek1117 on 1/12/16.
 */
const mongoose = require('mongoose');
let Todo = mongoose.model('Todo', new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
}));
exports.Todo = Todo;
//# sourceMappingURL=todo.js.map