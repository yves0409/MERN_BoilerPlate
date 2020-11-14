const express = require('express')
const router = express.Router()


//Import controllers
const {signup} = require('../controllers/auth');


router.get('/signup', signup)  //NOTE : second argument is the name of the controller

module.exports = router 