//create web server
//create a web server
const express = require('express');
const app = express();
//create a port
const port = 3000;
//create a static route
app.use(express.static('public'));
//create a route for comments
app.get('/comments', (req, res) => {
    res.send('Comments');
});
//create a route for comments with a parameter
app.get('/comments/:id', (req, res) => {
    res.send('Comment ID: ' + req.params.id);
});
//create a route for comments with a parameter
app.get('/comments/:id/:title?', (req, res) => {
    res.send('Comment ID: ' + req.params.id + ' and Title: ' + req.params.title);
});
//create a port listener
app.listen(port, () => {
    console.log('Listening on port: ' + port);
});