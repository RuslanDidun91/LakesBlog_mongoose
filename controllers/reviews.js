const Lake = require('../models/lake');

module.exports = {
    create,
    deleteReview
}

function deleteReview(req, res, next) {
    Lake.findOne({
        'reviews._id': req.params.id,
        'reviews.user': req.user._id
    }).then(function (lake) {
        //guard
        if (!lake) return res.redirect('/lakes');
        lake.reviews.remove(req.params.id);
        lake.save().then(function () {
            res.redirect(`/lakes/${lake._id}`);
        }).catch(function (err) {
            return next(err);
        });
    });
}

function create(req, res) {
    Lake.findById(req.params.id, function (err, lake) {
        //to make comments userCentric
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        lake.reviews.push(req.body);        
        lake.save(function (err) {
            res.redirect(`/lakes/${lake._id}`);
        });
    });
}