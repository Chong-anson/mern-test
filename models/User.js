const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    handle:{
        type: String, 
        require: true
    },
    email:{
         type: String, 
         required: true
    },
    password: {
        type: String, 
        required: true 
    },
    date: {
        type: Date, 
        default: Date.now()
    }
});

const User = mongoose.model('users', UserSchema);
// pass the schema to the mongoose model
module.exports = User; 