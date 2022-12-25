const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const isAuth = require('../config/isauth');

//

//POST/lakes/:id/reviews
router.post('/lakes/:id/reviews', isAuth, reviewsCtrl.create);
//DELETE/reviews/:id
router.delete('/reviews/:id', isAuth, reviewsCtrl.deleteReview);



module.exports = router;