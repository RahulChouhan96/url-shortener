require("dotenv").config();

// DB connection
require("./server/db.connection");

// Import packages
const express = require('express');
const passport = require('passport');

// Import routes
const urlRoutes = require("./server/routes/url");
const redirectUrlRoutes = require("./server/routes/redirect-url");
const authRoutes = require("./server/auth");

// Start Passport
require("./server/lib/passport")(passport);

// instatiate the express app  
const app = express();

app.use(express.json());
app.use("/home", express.static("./src/index.html"));

app.use("/", redirectUrlRoutes);
app.use("/url", urlRoutes);
app.use("/auth", authRoutes);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
});