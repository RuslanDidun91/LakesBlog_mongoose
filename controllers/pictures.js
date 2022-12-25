const Lake = require('../models/lake');
const User = require('../models/lake');
const Picture = require('../models/lake')

module.exports = {
    show,
    addPicture,
    deletePicture
}

function show(req, res) {
    Lake.findById(req.params.id, function (err, lake) {
        res.render('lakes/picture', { title: '', lake });
    })
}

function addPicture(req, res) {
    Lake.findById(req.params.id, function (err, lake) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        lake.pictures.push(req.body);
        lake.save(function (err) {
            res.redirect(`/lakes/${lake._id}/pictures`);
        });
    });
}

function deletePicture(req, res, next) {
    Lake.findOne({'pictures._id': req.params.id,
    'pictures.user': req.user._id}
    ).then(function (lake) {
        //guard
        if (!lake || err) return res.redirect(`/lakes/${lake._id}`);
        lake.pictures.remove(req.params.id);
        lake.save().then(function () {
            res.redirect(`/lakes/${lake._id}/pictures`);
        }).catch(function (err) {
            return next(err);
        });
    });
}

