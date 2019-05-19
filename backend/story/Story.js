const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Story = new Schema({
    story_title: {
        type: String
    },
    story_description: {
        type: String
    },
    story_author: {
        type: String
    },
    story_date: {
        type: Date
    },
    story_likes: {
        type: Number
    },    
    story_dislikes: {
        type: Number
    },

});

module.exports = mongoose.model('Story', Story);