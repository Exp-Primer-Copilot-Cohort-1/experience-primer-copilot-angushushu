// Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred');
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.post('/comments', (req, res) => {
    const newComment = req.body;
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred');
        } else {
            const comments = JSON.parse(data);
            comments.push(newComment);
            fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('An error occurred');
                } else {
                    res.send('Comment added');
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});