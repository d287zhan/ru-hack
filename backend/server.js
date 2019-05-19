const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const storyRoutes = express.Router();
const PORT = 4000;
mongo = require('mongodb')

var cookieParser = require('cookie-parser');

const UserController = require('./user/UserController');
const AuthController = require('./auth/Auth');
let Story = require('./story.model');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/stories', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

// const jwtMW = exjwt({
//     secret: 'keyboard cat 4 ever'
// });


storyRoutes.route('/').get(function (req, res) {
    Story.find(function (err, story) {
        if (err) {
            console.log(err);
        } else {
            res.json(story);
        }
    });
});

storyRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Story.findById(id, function (err, story) {
        res.json(story);
    });
});

storyRoutes.route('/update/:id').post(function (req, res) {
    Story.findById(req.params.id, function (err, story) {
        if (!story)
            res.status(404).send("data is not found");
        else
            story.story_title = req.body.story_title;
        story.story_description = req.body.story_description;
        story.story_author = req.body.story_author;
        story.story_date = req.body.story_date;
        story.story_likes = req.body.story_likes;
        story.story_dislikes = req.body.story_dislikes;

        story.save().then(story => {
            res.json('Story updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

storyRoutes.route('/add').post(function (req, res) {
    let story = new Story(req.body);
    story.save()
        .then(story => {
            res.status(200).json({ 'story': 'story added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new story failed');
        });
});

storyRoutes.route('/delete/:id').post(function (req, res) {
    Story.deleteOne({ _id: mongo.ObjectID(req.params.id) }, (err, results) => {
        if (err) res.status(400).send('removing new story failed');
        res.status(200).json({ 'story': 'story delete successfully' });
    })
});

app.use('/stories', storyRoutes);
app.use('/users', UserController);
app.use('/auth', AuthController);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});