const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const picturesSchema = new Schema({
    picture: {
        type: String
    },
    about: {
        type: String
    }
});

const reviewSchema = new Schema({
    content: {
        type: String,
        reequired: true
    },
    rating: {
        type: String,
        min: 1,
        max: 5,
        default: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

const lakeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String
    },
    image: {
        type: String
    },
    longDescription: {
        type: String
    },
    googleLink: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activities: [activitySchema],
    reviews: [reviewSchema],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    pictures: [picturesSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Lake', lakeSchema);
