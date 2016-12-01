"use strict";
/**
 * Created by derek1117 on 1/12/16.
 */
const mongoose = require('mongoose');
let User = mongoose.model('User', new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    }
}));
exports.User = User;
//# sourceMappingURL=user.js.map