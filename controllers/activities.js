const Activity = require('../models/activity');
const Lake = require('../models/lake');

module.exports = {
    create,
    deleteActivity
}

function deleteActivity(req, res, next) {
    Lake.findOne({'activities._id': req.params.id,
    'activities.user': req.user._id}
    ).then(function (lake) {
        //guard
        if (!lake) return res.redirect('/lakes');
        lake.activities.remove(req.params.id);
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
        // req.body.userAvatar = req.user.avatar;
        lake.activities.push(req.body);        
        lake.save(function (err) {
            res.redirect(`/lakes/${lake._id}`);
        });
    });
}
