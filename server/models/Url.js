const { Schema, model } = require('mongoose')

const URLSchema = new Schema({
    long_url: String,
    users: [{
        url_code: String,
        key: String,
        short_url: String
    }]
}, { timestamps: true });

module.exports = model('Url', URLSchema);