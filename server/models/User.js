const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    userName: String,
    password: String,
    key: { type: String, unique: true }
}, { timestamps: true });

module.exports = model('User', UserSchema);