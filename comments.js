// Create web server
var express = require('express');
var router = express.Router();
var Comments = require('../models/comments');
var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments');

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
});

// On error
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in database connection: ' + err);
    }
});

// Get all comments
router.get('/', (req, res, next) => {
    Comments.find((err, comments) => {
        if (err) {
            res.json(err);
        } else {
            res.json(comments);
        }
    });
});

// Get a single comment
router.get('/:id', (req, res, next) => {
    Comments.findById(req.params.id, (err, comment) => {
        if (err) {
            res.json(err);
        } else {
            res.json(comment);
        }
    });
});

// Add a comment
router.post('/', (req, res, next) => {
    let newComment = new Comments({
        name: req.body.name,
        comment: req.body.comment
    });

    newComment.save((err, comment) => {
        if (err) {
            res.json(err);
        } else {
            res.json({msg: 'Comment added successfully'});
        }
    });
});

// Update a comment
router.put('/:id', (req, res, next) => {
    Comments.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            comment: req.body.comment
        }
    }, (err, comment) => {
        if (err) {
            res.json(err);
        } else {
            res.json({msg: 'Comment updated successfully'});
        }
    });
});

// Delete a comment
router.delete('/:id', (req, res, next) => {
    Comments.remove({_id: req.params.id}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json({msg: 'Comment deleted successfully'});
        }
    });
});

module.exports = router;