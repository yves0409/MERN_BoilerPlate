const express = require('express')
const router = express.Router()


//Import controllers
const {read,update} = require('../controllers/user');
const {requireSignin,adminMiddleware} = require('../controllers/auth')




router.get('/user/:id',requireSignin,read)  //NOTE : second argument is the name of the controller
router.put('/user/update/',requireSignin,update) // No need for id because we are already signed in (requiresignin middleware)
router.put('/admin/update/',requireSignin,adminMiddleware,update)



module.exports = router 