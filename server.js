const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessions({ secret: 'secret123', saveUninitialized: true, resave: false }));

// This endpoint is vulnerable to SQL Injection
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`; // Vulnerable to SQL Injection
    // execute sql... (not shown)
});

// This endpoint allows generic cross-site scripting (XSS)
app.get('/search', (req, res) => {
    const searchTerm = req.query.term; // user input directly used
    res.send(`<h1>Results for: ${searchTerm}</h1>`); // Vulnerable to XSS
});

// This endpoint has insecure direct object references (IDOR)
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    // assuming a firestore fetch here... but no checks
    // fetch user by userId... (not shown)
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});