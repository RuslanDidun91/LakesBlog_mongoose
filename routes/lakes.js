const express = require('express');
const router = express.Router();
const lakesCtrl = require('../controllers/lakes');
const isAuth = require('../config/isauth');


//GET/login
router.get('/login', lakesCtrl.login);
//GET/lakes (display all lakes)
router.get('/', lakesCtrl.index);
//GET/lakes/new (display form for new lake)
router.get('/new', isAuth, lakesCtrl.newLake);
//POST/lakes (display new lake after form being submitted)
router.post('/', lakesCtrl.create);

//GET/lakes (display myFavourite page)
router.get('/favorite', lakesCtrl.showFavorite);

//GET/lakes/id (to display details page)
router.get('/:id', lakesCtrl.show);


//add to fav
router.post('/:id/favorite', lakesCtrl.addToFavorite);


//DELETE/lakes/:id (to delete certain lake)
router.delete('/:id', isAuth, lakesCtrl.deleteLake);

//PUT/lakes/:id/edit
router.get('/:id/edit', isAuth, lakesCtrl.edit);
//GET/lakes/id
router.put('/:id', isAuth, lakesCtrl.update);


module.exports = router;

//fix