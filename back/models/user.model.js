const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    gender: String,
    createDate: String,
    verifiedEmail: Boolean,
    verificationCode: Number,
    avatarKey: String
});

module.exports = mongoose.model('User', UserSchema);
