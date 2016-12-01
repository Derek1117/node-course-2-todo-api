/**
 * Created by derek1117 on 1/12/16.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
export {mongoose};