/**
 * Created by derek1117 on 1/12/16.
 */
import mongoose = require('mongoose');

let User = mongoose.model('User', new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    }
}));

export { User };