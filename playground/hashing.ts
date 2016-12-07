/**
 * Created by derek1117 on 6/12/16.
 */
import {SHA256} from 'crypto-js';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

var password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(password, salt, (err, hash) => {
       console.log(salt);
       console.log(hash);
   });
});

var hashedPassword = '$2a$10$two1KANlQcqyYspO4iAuMu9zh64EynLI/pAbOyedy.NuwPWcqbYny';
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});


// var data = {
//     id: 10
// };
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '123acc');
// console.log(decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(hash);
//
// var data = {
//     id: 4
// };
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//     console.log('Data was not changed.');
// } else {
//     console.log('Data was changed. Do not trust!');
// }
//
