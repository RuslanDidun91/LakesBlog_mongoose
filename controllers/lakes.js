const Lake = require('../models/lake');
const User = require('../models/user');

module.exports = {
    login,
    show,
    index,
    newLake,
    create,
    deleteLake,
    edit,
    update,
    addToFavorite,
    showFavorite
}

function edit(req, res) {
    Lake.findOne({ _id: req.params.id }, function (err, lake) {
        if (err || !lake) return res.redirect('/lakes');
        res.render('lakes/edit', { title: '', lake });
    });
}

function update(req, res) {
    Lake.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, lake) {
        if (err || !lake) return res.redirect('/lakes');
        res.redirect(`/lakes/${lake._id}`);
    });
}

function deleteLake(req, res) {
    Lake.findByIdAndDelete(req.params.id, req.user._id, function (err) {
        if (err) return res.redidect('/lakes');
        res.redirect('/lakes');
    })
}

//render main page
function show(req, res) {
    Lake.findById(req.params.id)
        .populate('activities')
        .exec(function (err, lake) {
            res.render('lakes/show', { title: 'Lakes blog', lake });
        });
}

function create(req, res) {
    const lake = new Lake(req.body);
    //
    lake.user = req.user._id;
    req.body.user = req.user._id;
    //
    lake.save(function () {
        // if we don't redirect, the new page will be shown
        // with /lake in the address bar
        // if (err) return res.redidect('lakes/new');
        res.redirect('/lakes');
    });
}

function index(req, res) {
    Lake.find({}, function (err, lakes) {
        res.render('lakes/index', { title: 'Lakes blog', lakes });
    });
}

//render add newLake page
function newLake(req, res) {
    res.render('lakes/new', { title: 'add lake' });
}

//render login page
function login(req, res) {
    //no '/' when rendering
    res.render('lakes/login', { title: '' });
}




//render favourite page
function showFavorite(req, res) {
    User.findById(req.user.id)
        .populate('favorites')
        .exec(function (err, userPop) {
            res.render('lakes/favorite', { title: '', userPop });
        })
}

function addToFavorite(req, res) {
    Lake.findById(req.params.id, function (err, lake) {
        if (lake.favorites.id(req.user._id)) return res.redirect('/lakes');
        lake.favorites.push(req.params._id);
        lake.save(function (err) {
            res.redirect(`/lakes/${lake._id}`);
        });
    });
}
