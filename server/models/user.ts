/**
 * Created by derek1117 on 1/12/16.
 */
import mongoose = require('mongoose');
import * as validator from 'validator';
import * as jwt from 'jsonwebtoken';
import * as _ from "lodash";

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
        unqiue: true,
        validate: {
            validator: validator.isEmail,
            //message: '{VALUE} is not a valid email'
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

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
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

export { User };