const express = require('express');
const router = express.Router();
const activitiesCtrl = require('../controllers/activities');
const isAuth = require('../config/isauth');

//POST/lakes/:id/activities
router.post('/lakes/:id/activities', isAuth, activitiesCtrl.create);
//DELETE/lakes/:id
router.delete('/lakes/:lakeId/activities/:id', isAuth, activitiesCtrl.deleteActivity);
 
module.exports = router;