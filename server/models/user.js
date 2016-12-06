"use strict";
/**
 * Created by derek1117 on 1/12/16.
 */
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require("lodash");
let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
        unqiue: true,
        validate: {
            validator: validator.isEmail,
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
});
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString();
    user.tokens.push({
        access,
        token
    });
    user.save().then(() => {
        return token;
    });
};
let User = mongoose.model('User', UserSchema);
exports.User = User;
//# sourceMappingURL=user.js.map