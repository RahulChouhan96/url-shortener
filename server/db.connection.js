// import mongoose package
const mongoose = require('mongoose')

// declare a Database string URI
const DB_URI = 'mongodb://localhost:27017/practice';

// establishing a database connection
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (!error)
        console.log("DB Connected!");
});