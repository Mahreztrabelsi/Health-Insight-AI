// server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let storedData = {};
let userstoredData = {};


// Sign Up APi Request

app.post('/save-Signup', (req, res) => {
    userstoredData = req.body;
    res.json({ message: 'User Data saved successfully' });
});


app.get('/fetch-Signup', (req, res) => {
    res.json(userstoredData);
});




// Test Model APi Request
app.post('/save-data', (req, res) => {
    storedData = req.body;
    res.json({ message: 'Data saved successfully' });
});


app.get('/fetch-data', (req, res) => {
    res.json(storedData);
});




const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});