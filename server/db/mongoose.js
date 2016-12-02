"use strict";
/**
 * Created by derek1117 on 1/12/16.
 */
var mongoose = require('mongoose');
exports.mongoose = mongoose;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
//# sourceMappingURL=mongoose.js.map