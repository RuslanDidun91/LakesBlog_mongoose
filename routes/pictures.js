const express = require('express');
const router = express.Router();
const picturesCtrl = require('../controllers/pictures');
const isAuth = require('../config/isauth');


//GET/lakes/:id/pictures
router.get('/lakes/:id/pictures', picturesCtrl.show);
//POST/lakes/:id/pictures
router.post('/lakes/:id/pictures', picturesCtrl.addPicture);
//DELETE/lakes/:id/pictures/:id
router.delete('/lakes/:id/pictures/:id', picturesCtrl. deletePicture);



module.exports = router;