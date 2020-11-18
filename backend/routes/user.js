const express = require('express')
const router = express.Router()


//Import controllers
const {read} = require('../controllers/user');




router.get('/user/:id',read)  //NOTE : second argument is the name of the controller

module.exports = router 